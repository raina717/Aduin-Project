package usecase

import (
	"context"
	"service-complaint/internal/modules/complaint/domain"

	"github.com/golangid/candi/tracer"
)

func (uc *complaintUsecaseImpl) IncrementShare(ctx context.Context, id int) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:PutAction")
	defer trace.Finish()

	complaint, err := uc.repoSQL.ComplaintRepo().Find(ctx, &domain.FilterComplaint{ID: &id})
	if err != nil {
		return err
	}

	complaint.ShareCount++

	return uc.repoSQL.ComplaintRepo().Save(ctx, &complaint)
}
