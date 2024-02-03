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

func (uc *complaintUsecaseImpl) AddComment(ctx context.Context, payload *domain.AddComment) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:AddComment")
	defer trace.Finish()

	user, err := uc.repoSQL.UserRepo().Find(ctx, &userdomain.FilterUser{ID: &payload.UserID})
	if err != nil {
		return err
	}

	complaint, err := uc.repoSQL.ComplaintRepo().Find(ctx, &domain.FilterComplaint{ID: &payload.ComplaintID})
	if err != nil {
		return err
	}

	var comment shareddomain.Comment
	comment.ComplaintID = complaint.ID
	comment.UserID = payload.UserID
	comment.Description = payload.Description

	return uc.repoSQL.WithTransaction(ctx, func(ctx context.Context) error {
		if err := uc.repoSQL.ComplaintRepo().SaveComment(ctx, &comment); err != nil {
			return err
		}

		return uc.service.AuthService.CreateNotification(ctx, auth.PayloadNotification{
			Title:       user.Fullname,
			UserID:      complaint.UserID,
			Description: fmt.Sprintf(`Memberi komentar "%s" pada aduan anda`, payload.Description),
			Icon:        user.ProfilePhoto,
		})
	})
}
