package usecase

import (
	"context"
	"fmt"
	"service-complaint/internal/modules/complaint/domain"
	userdomain "service-complaint/internal/modules/user/domain"
	shareddomain "service-complaint/pkg/shared/domain"
	"service-complaint/pkg/shared/service/auth"

	"github.com/golangid/candi/tracer"
)

// AddResponse implements ComplaintUsecase.
func (uc *complaintUsecaseImpl) AddResponse(ctx context.Context, payload *domain.AddComplaintResponse) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:AddResponse")
	defer trace.Finish()

	user, err := uc.repoSQL.UserRepo().Find(ctx, &userdomain.FilterUser{ID: &payload.UserID})
	if err != nil {
		return err
	}

	complaint, err := uc.repoSQL.ComplaintRepo().Find(ctx, &domain.FilterComplaint{ID: &payload.ComplaintID})
	if err != nil {
		return err
	}

	var response shareddomain.Response
	response.ComplaintID = complaint.ID
	response.UserID = payload.UserID
	response.Description = payload.Description

	return uc.repoSQL.WithTransaction(ctx, func(ctx context.Context) error {
		if err := uc.repoSQL.ComplaintRepo().SaveResponse(ctx, &response); err != nil {
			return err
		}

		return uc.service.AuthService.CreateNotification(ctx, auth.PayloadNotification{
			Title:       user.Fullname,
			UserID:      complaint.UserID,
			Description: fmt.Sprintf(`Memberi tindakan "%s"`, payload.Description),
			Icon:        user.ProfilePhoto,
		})
	})

}
