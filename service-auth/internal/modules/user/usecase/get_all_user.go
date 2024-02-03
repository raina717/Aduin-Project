package usecase

import (
	"context"

	"service-auth/internal/modules/user/domain"

	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/tracer"
)

func (uc *userUsecaseImpl) GetAllUser(ctx context.Context, filter *domain.FilterUser) (results []domain.DetailUserResponse, meta candishared.Meta, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:GetAllUser")
	defer trace.Finish()

	filter.Preloads = []string{"Role"}

	filter.RoleIDs = []int{1}

	if filter.Role == "admin" {
		filter.RoleIDs = []int{2, 3, 4}
	}

	data, err := uc.repoSQL.UserRepo().FetchAll(ctx, filter)
	if err != nil {
		return results, meta, err
	}
	count := uc.repoSQL.UserRepo().Count(ctx, filter)
	meta = candishared.NewMeta(filter.Page, filter.Limit, count)

	for _, user := range data {
		var res domain.DetailUserResponse
		res.UserID = user.ID
		res.Fullname = user.Fullname
		res.Email = user.Email
		res.Status = user.Status
		res.Role.ID = user.RoleID
		res.Role.RoleName = user.Role.RoleName
		res.CreatedAt = user.CreatedAt
		res.UpdatedAt = user.UpdatedAt

		results = append(results, res)
	}

	return
}
