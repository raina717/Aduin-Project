package usecase

import (
	"context"

	"service-auth/internal/modules/user/domain"

	"github.com/golangid/candi/tracer"
)

func (uc *userUsecaseImpl) GetDetailUser(ctx context.Context, id int) (resp domain.DetailUserResponse, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:GetDetailUser")
	defer trace.Finish()

	repoFilter := domain.FilterUser{ID: &id, Preloads: []string{"Role"}}
	data, err := uc.repoSQL.UserRepo().Find(ctx, &repoFilter)
	if err != nil {
		return resp, err
	}

	resp.UserID = data.ID
	resp.Fullname = data.Fullname
	resp.Email = data.Email
	resp.WhatsappNumber = data.WhatsappNumber
	resp.ProfilePhoto = data.ProfilePhoto
	resp.Address = data.Address
	resp.Status = data.Status
	resp.Role.ID = data.RoleID
	resp.Role.RoleName = data.Role.RoleName
	resp.SectorID = data.SectorID
	resp.CreatedAt = data.CreatedAt
	resp.UpdatedAt = data.UpdatedAt

	return
}
