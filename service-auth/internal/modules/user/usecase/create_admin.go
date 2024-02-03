package usecase

import (
	"context"
	"errors"

	"service-auth/internal/modules/user/domain"
	shareddomain "service-auth/pkg/shared/domain"

	"github.com/golangid/candi/tracer"
	"gorm.io/gorm"
)

func (uc *userUsecaseImpl) CreateAdmin(ctx context.Context, payload *domain.AddAdminPayload) error {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:CreateAdmin")
	defer trace.Finish()

	var user shareddomain.User
	user.Fullname = payload.Fullname
	user.Email = payload.Email
	user.WhatsappNumber = payload.WhatsappNumber
	user.Status = domain.StatusActive
	user.ProfilePhoto = payload.ProfilePhoto
	user.RoleID = payload.RoleID
	user.SectorID = payload.SectorID

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

	return uc.repoSQL.UserRepo().Save(ctx, &user)
}
