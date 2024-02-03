package usecase

import (
	"context"
	"errors"
	"service-auth/internal/modules/user/domain"
	"service-auth/pkg/shared"

	"github.com/golangid/candi/candihelper"
	"github.com/golangid/candi/tracer"
)

// Login implements UserUsecase.
func (uc *userUsecaseImpl) Login(ctx context.Context, payload *domain.LoginPayload) (resp domain.LoginResponse, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:Login")
	defer trace.Finish()

	userData, err := uc.repoSQL.UserRepo().Find(ctx, &domain.FilterUser{
		Email:    payload.Email,
		Preloads: []string{"Role"},
	})

	if err != nil {
		return resp, errors.New("User tidak ditemukan")
	}

	if !uc.passHasher.VerifyPassword(payload.Password, userData.Password, userData.Salt) {
		return resp, errors.New("Password Tidak Valid")
	}

	resultToken, err := uc.GenerateToken(ctx, &domain.RequestGenerateToken{
		Subject: candihelper.ToString(userData.ID),
	})

	resp.Token = resultToken.Token
	resp.ExpiredTokenTimeInMinutes = shared.GetEnv().JWTAccessTokenAge.Minutes()

	resp.User = userData

	return
}
