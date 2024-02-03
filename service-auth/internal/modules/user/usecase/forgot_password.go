package usecase

import (
	"context"
	"errors"
	"fmt"
	"service-auth/internal/modules/user/domain"
	"service-auth/pkg/helper"
	"service-auth/pkg/shared"
	"service-auth/pkg/shared/service/mail"

	"github.com/golangid/candi/tracer"
	"gorm.io/gorm"
)

// ForgotPassword implements UserUsecase.
func (uc *userUsecaseImpl) ForgotPassword(ctx context.Context, req domain.ForgotPasswordRequet) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:ForgotPassword")
	defer trace.Finish()

	data, err := uc.repoSQL.UserRepo().Find(ctx, &domain.FilterUser{
		Email: req.Email,
	})
	if err != nil {
		return err
	}

	token, err := uc.generateRegisterToken(ctx, data.Email)
	if err != nil {
		return err
	}

	err = uc.service.Mail.SendEmail(ctx, &mail.RequestPayloadEmail{
		Recipients: []string{data.Email},
		Subject:    "Reset Password",
		Content: helper.GenerateTemplateForgotPassword(
			fmt.Sprintf("%s/reset-password?token=%s", shared.GetEnv().WebsiteURL, token),
		),
	})

	if err != nil {
		return err
	}

	return nil
}

// UpdatePassword implements UserUsecase.
func (uc *userUsecaseImpl) UpdatePassword(ctx context.Context, payload domain.UpdatePasswordRequest) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:UpdatePassword")
	defer trace.Finish()

	if payload.Password != payload.ConfirmPassword {
		return errors.New("password Tidak Valid")
	}

	if err := uc.formatPassword(payload.Password); err != nil {
		return err
	}

	email, err := uc.validateRegisterToken(ctx, payload.Token)
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

	data.Password, data.Salt = uc.passHasher.HashPassword(payload.Password)

	return uc.repoSQL.UserRepo().Save(ctx, &data)
}
