package usecase

import (
	"context"
	"service-complaint/internal/modules/complaint/domain"
	shareddomain "service-complaint/pkg/shared/domain"

	"github.com/golangid/candi/tracer"
)

// GetCategories implements ComplaintUsecase.
func (uc *complaintUsecaseImpl) GetCategories(ctx context.Context) (data []shareddomain.Category, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:GetCategories")
	defer trace.Finish()

	data, err = uc.repoSQL.ComplaintRepo().FetchAllCategory(ctx, &domain.FilterCategory{})
	if err != nil {
		return data, err
	}

	return
}
