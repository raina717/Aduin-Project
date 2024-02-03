package usecase

import (
	"context"
	"errors"
	"fmt"
	"regexp"
	"service-auth/internal/modules/user/domain"
	"service-auth/pkg/helper"
	"service-auth/pkg/shared"
	shareddomain "service-auth/pkg/shared/domain"
	"service-auth/pkg/shared/service/mail"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/tracer"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func (uc *userUsecaseImpl) formatPassword(password string) (err error) {
	if strings.HasPrefix(password, " ") || strings.HasSuffix(password, " ") {
		err = fmt.Errorf("Jangan mengawali atau mengakhiri password dengan spasi kosong")
		return err
	}
	// Check password length
	if len(password) < 8 {
		err = fmt.Errorf("Password harus terdiri dari minimal 8 karakter berisikan huruf dan angka")
		return err
	}

	// Check for at least one uppercase letter or lowercase letter, and one digit
	matchAlphabet := regexp.MustCompile(`[a-zA-Z]`).MatchString
	matchDigit := regexp.MustCompile(`[0-9]`).MatchString

	if !matchAlphabet(password) || !matchDigit(password) {
		err = fmt.Errorf("Password harus terdiri dari minimal 8 karakter berisikan huruf dan angka")
		return err
	}

	return
}

func (uc *userUsecaseImpl) RegisterUser(ctx context.Context, payload *domain.RegisterPayload) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:RegisterUser")
	defer trace.Finish()

	var user shareddomain.User
	user.Fullname = payload.Fullname
	user.Email = payload.Email
	user.WhatsappNumber = payload.WhatsappNumber
	user.Status = domain.StatusInactive
	user.RoleID = domain.RoleUser

	data, err := uc.repoSQL.UserRepo().Find(ctx, &domain.FilterUser{
		Email: payload.Email,
	})

	if err != nil && err != gorm.ErrRecordNotFound {
		return err
	}

	if data.ID != 0 {
		return errors.New("Email sudah terdaftar")
	}

	if payload.Password != payload.ConfirmPassword {
		return errors.New("Password Tidak Valid")
	}

	if err := uc.formatPassword(payload.Password); err != nil {
		return err
	}

	user.Password, user.Salt = uc.passHasher.HashPassword(payload.Password)

	registerToken, err := uc.generateRegisterToken(ctx, payload.Email)
	if err != nil {
		return err
	}

	err = uc.service.Mail.SendEmail(ctx, &mail.RequestPayloadEmail{
		Recipients: []string{payload.Email},
		Subject:    "Selamat Datang di Adu.in",
		Content: helper.GenerateTemplateRegister(
			payload.Fullname, shared.GetEnv().WebsiteURL,
			fmt.Sprintf("%s/verify-email?token=%s",
				shared.GetEnv().WebsiteURL, registerToken),
		),
	})

	if err != nil {
		return err
	}

	return uc.repoSQL.UserRepo().Save(ctx, &user)

}

func (uc userUsecaseImpl) generateRegisterToken(ctx context.Context, email string) (token string, err error) {

	now := time.Now()
	ageDuration := shared.GetEnv().JWTRegisterTokenAge
	exp := now.Add(ageDuration)

	stdClaim := &jwt.StandardClaims{
		ExpiresAt: exp.Unix(),
		IssuedAt:  now.Unix(),
		Issuer:    "aduin",
		Subject:   email,
		Id:        uuid.NewString(),
	}

	jwtToken := jwt.New(jwt.SigningMethodRS256)
	jwtToken.Claims = stdClaim

	token, err = jwtToken.SignedString(uc.rsaPrivateKey)
	if err != nil {
		return "", err
	}

	tokenEncrypt, err := uc.aesCrypto.Encrypt(ctx, &shared.AESGcmParam{Plaintext: token})
	if err != nil {
		return "", err
	}

	return tokenEncrypt, nil
}

func (uc userUsecaseImpl) validateRegisterToken(ctx context.Context, token string) (email string, err error) {

	tokenDecrypt, err := uc.aesCrypto.Decrypt(ctx, token)
	if err != nil {
		return "", err
	}

	tokenParse, err := uc.jwtParser.ParseWithClaims(tokenDecrypt, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return uc.rsaPublicKey, nil
	})

	switch ve := err.(type) {
	case *jwt.ValidationError:
		if ve.Errors == jwt.ValidationErrorExpired {
			err = errors.New("Token is expired")
		} else {
			err = errors.New("Invalid token format")
		}
	}

	if err != nil {
		return
	}

	if !tokenParse.Valid {
		return "", errors.New("Invalid token format")
	}

	stdClaim, _ := tokenParse.Claims.(*jwt.StandardClaims)
	claim := &candishared.TokenClaim{
		StandardClaims: *stdClaim,
	}

	return claim.Subject, nil
}

// VerifyRegister implements UserUsecase.
func (uc *userUsecaseImpl) VerifyRegister(ctx context.Context, token string) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:VerifyRegister")
	defer trace.Finish()

	email, err := uc.validateRegisterToken(ctx, token)
	if err != nil {
		return err
	}

	data, err := uc.repoSQL.UserRepo().Find(ctx, &domain.FilterUser{
		Email: email,
	})

	if err != nil && err != gorm.ErrRecordNotFound {
		return err
	}

	if err == gorm.ErrRecordNotFound {
		return errors.New("user tidak ditemukan")
	}

	data.Status = domain.StatusActive

	return uc.repoSQL.UserRepo().Save(ctx, &data)

}

func (uc *userUsecaseImpl) ResendVerifyEmail(ctx context.Context, payload domain.ResendVerifyEmailRequet) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:ResendVerifyEmail")
	defer trace.Finish()

	data, err := uc.repoSQL.UserRepo().Find(ctx, &domain.FilterUser{
		Email: payload.Email,
	})
	if err != nil {
		return err
	}

	if data.Status != domain.StatusInactive {
		return errors.New("email sudah diverifikasi")
	}

	registerToken, err := uc.generateRegisterToken(ctx, payload.Email)
	if err != nil {
		return err
	}

	err = uc.service.Mail.SendEmail(ctx, &mail.RequestPayloadEmail{
		Recipients: []string{payload.Email},
		Subject:    "Selamat Datang di Adu.in",
		Content: helper.GenerateTemplateRegister(
			data.Fullname, shared.GetEnv().WebsiteURL,
			fmt.Sprintf("%s/verify-email?token=%s",
				shared.GetEnv().WebsiteURL, registerToken),
		),
	})

	if err != nil {
		return err
	}

	return nil
}
