package usecase

import (
	"context"
	"fmt"
	"service-complaint/internal/modules/complaint/domain"
	userdomain "service-complaint/internal/modules/user/domain"
	shareddomain "service-complaint/pkg/shared/domain"
	"service-complaint/pkg/shared/service/auth"

	"github.com/golangid/candi/tracer"
	"gorm.io/gorm"
)

func (uc *complaintUsecaseImpl) PutLike(ctx context.Context, payload *domain.PutLike) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:PutLike")
	defer trace.Finish()

	complaint, err := uc.repoSQL.ComplaintRepo().Find(ctx, &domain.FilterComplaint{ID: &payload.ComplaintID})
	if err != nil {
		return err
	}

	user, err := uc.repoSQL.UserRepo().Find(ctx, &userdomain.FilterUser{ID: &payload.UserID})
	if err != nil {
		return err
	}

	var like shareddomain.Like

	like, err = uc.repoSQL.ComplaintRepo().FindLike(ctx, &domain.FilterLike{
		ComplaintID: payload.ComplaintID,
		UserID:      payload.UserID,
	})

	if err == gorm.ErrRecordNotFound {
		return uc.repoSQL.WithTransaction(ctx, func(ctx context.Context) error {

			like.ComplaintID = payload.ComplaintID
			like.UserID = payload.UserID

			if err := uc.repoSQL.ComplaintRepo().SaveLike(ctx, &like); err != nil {
				return err
			}

			complaint.LikeCount++
			if err := uc.repoSQL.ComplaintRepo().Save(ctx, &complaint); err != nil {
				return err
			}

			return uc.service.AuthService.CreateNotification(ctx, auth.PayloadNotification{
				Title:       user.Fullname,
				UserID:      complaint.UserID,
				Description: fmt.Sprintf(`%s Menyukai aduan anda`, user.Fullname),
				Icon:        user.ProfilePhoto,
			})
		})

	}

	return uc.repoSQL.WithTransaction(ctx, func(ctx context.Context) error {
		complaint.LikeCount--
		if err := uc.repoSQL.ComplaintRepo().Save(ctx, &complaint); err != nil {
			return err
		}

		return uc.repoSQL.ComplaintRepo().DeleteLike(ctx, &domain.FilterLike{ID: &like.ID})
	})

}
