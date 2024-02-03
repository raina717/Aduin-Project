package usecase

import (
	"context"
	"errors"
	"service-auth/internal/modules/user/domain"
	"service-auth/pkg/shared"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/tracer"
	"github.com/google/uuid"
)

func (uc *userUsecaseImpl) GenerateToken(ctx context.Context, req *domain.RequestGenerateToken) (resp domain.ResponseGenerateToken, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:GenerateToken")
	defer trace.Finish()

	now := time.Now()
	ageDuration := shared.GetEnv().JWTAccessTokenAge + req.AdditionalAge
	exp := now.Add(ageDuration)

	stdClaim := &jwt.StandardClaims{
		ExpiresAt: exp.Unix(),
		IssuedAt:  now.Unix(),
		Issuer:    "aduin",
		Subject:   req.Subject,
		Id:        uuid.NewString(),
	}

	jwtToken := jwt.New(jwt.SigningMethodRS256)
	jwtToken.Claims = stdClaim

	token, err := jwtToken.SignedString(uc.rsaPrivateKey)
	if err != nil {
		return resp, err
	}

	tokenEncrypt, err := uc.aesCrypto.Encrypt(ctx, &shared.AESGcmParam{Plaintext: token, NonceAge: ageDuration})
	if err != nil {
		return resp, err
	}

	// refreshTokenHS := jwt.New(jwt.SigningMethodHS256)
	// refreshTokenAge := shared.GetEnv().JWTRefreshTokenAge + req.AdditionalAge
	// refreshTokenHS.Claims = &jwt.StandardClaims{
	// 	ExpiresAt: now.Add(refreshTokenAge).Unix(),
	// 	Subject:   req.Subject,
	// }
	// refreshTokenString, err := refreshTokenHS.SignedString([]byte(helper.RefreshTokenKey))
	// if err != nil {
	// 	return resp, err
	// }

	// refreshTokenEncrypt, err := uc.aesCrypto.Encrypt(ctx, &shared.AESGcmParam{Plaintext: refreshTokenString, NonceAge: refreshTokenAge})
	// if err != nil {
	// 	return resp, err
	// }

	return domain.ResponseGenerateToken{
		Token:    tokenEncrypt,
		TokenAge: ageDuration,
		// RefreshToken: refreshTokenEncrypt,
		// RefreshTokenAge: refreshTokenAge,
	}, nil
}

// ValidateToken implements interfaces.TokenValidator.
func (uc userUsecaseImpl) ValidateToken(ctx context.Context, token string) (claim *candishared.TokenClaim, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "AuthUsecase:ValidateToken")
	defer trace.Finish()

	tokenDecrypt, err := uc.aesCrypto.Decrypt(ctx, token)
	if err != nil {
		return claim, err
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
		return claim, errors.New("Invalid token format")
	}

	stdClaim, _ := tokenParse.Claims.(*jwt.StandardClaims)
	claim = &candishared.TokenClaim{
		StandardClaims: *stdClaim,
	}

	return
}
