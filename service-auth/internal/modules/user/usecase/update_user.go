package usecase

import (
	"context"

	"service-auth/internal/modules/user/domain"

	"github.com/golangid/candi/candihelper"
	"github.com/golangid/candi/tracer"
)

func (uc *userUsecaseImpl) UpdateUser(ctx context.Context, data *domain.UpdateUserPayload) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:UpdateUser")
	defer trace.Finish()

	repoFilter := domain.FilterUser{ID: candihelper.ToIntPtr(data.UserID)}
	existing, err := uc.repoSQL.UserRepo().Find(ctx, &repoFilter)
	if err != nil {
		return err
	}

	existing.Fullname = data.Fullname
	existing.Address = data.Address
	existing.WhatsappNumber = data.WhatsappNumber
	existing.ProfilePhoto = data.ProfilePhoto

	if data.SectorID != 0 {
		existing.SectorID = data.SectorID
	}

	if data.Status != "" {
		existing.Status = data.Status
	}

	err = uc.repoSQL.WithTransaction(ctx, func(ctx context.Context) error {
		return uc.repoSQL.UserRepo().Save(ctx, &existing)
	})
	return
}
