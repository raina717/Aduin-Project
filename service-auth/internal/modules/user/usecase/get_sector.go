package usecase

import (
	"context"
	"service-auth/internal/modules/user/domain"
	shareddomain "service-auth/pkg/shared/domain"

	"github.com/golangid/candi/tracer"
)

// GetListSector implements UserUsecase.
func (uc *userUsecaseImpl) GetListSector(ctx context.Context) (data []shareddomain.Sector, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserUsecase:GetListSector")
	defer trace.Finish()

	data, err = uc.repoSQL.UserRepo().FetchAllSector(ctx, &domain.FilterSector{})
	if err != nil {
		return data, err
	}

	return

}
