package usecase

import (
	"context"
	
	"service-complaint/internal/modules/complaint/domain"

	"github.com/golangid/candi/tracer"
)

func (uc *complaintUsecaseImpl) DeleteComplaint(ctx context.Context, id int) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:DeleteComplaint")
	defer trace.Finish()

	repoFilter := domain.FilterComplaint{ID: &id}
	return uc.repoSQL.ComplaintRepo().Delete(ctx, &repoFilter)
}
