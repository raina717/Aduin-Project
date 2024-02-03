package usecase

import (
	"context"
	"fmt"

	"service-complaint/internal/modules/complaint/domain"
	userdomain "service-complaint/internal/modules/user/domain"
	"service-complaint/pkg/shared/service/auth"

	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/tracer"
)

func (uc *complaintUsecaseImpl) UpdateComplaint(ctx context.Context, payload *domain.UpdateComplaint) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:UpdateComplaint")
	defer trace.Finish()

	changer, err := uc.repoSQL.UserRepo().Find(ctx, &userdomain.FilterUser{ID: &payload.ChangedBy})
	if err != nil {
		return err
	}

	newCategory, err := uc.repoSQL.ComplaintRepo().FindCategory(ctx, &domain.FilterCategory{ID: &payload.CategoryID})
	if err != nil {
		return err
	}

	repoFilter := domain.FilterComplaint{ID: &payload.ComplaintID, Preloads: []string{"User", "Category"}}
	existing, err := uc.repoSQL.ComplaintRepo().Find(ctx, &repoFilter)
	if err != nil {
		return err
	}

	var statusHasChanged bool
	var sectorHasChanged bool

	if existing.Status != payload.Status {
		statusHasChanged = true
		existing.Status = payload.Status
	}

	if existing.CategoryID != payload.CategoryID {
		existing.CategoryID = payload.CategoryID

		if newCategory.SectorID != existing.Category.SectorID {
			sectorHasChanged = true
		}

	}

	return uc.repoSQL.WithTransaction(ctx, func(ctx context.Context) error {
		err := uc.repoSQL.ComplaintRepo().Save(ctx, &existing, candishared.DBUpdateSetUpdatedFields("CategoryID", "Status"))
		if err != nil {
			return err
		}

		if statusHasChanged {
			err := uc.service.AuthService.CreateNotification(ctx, auth.PayloadNotification{
				Title:       changer.Fullname,
				UserID:      existing.UserID,
				Description: fmt.Sprintf(`%s telah merubah status Aduan anda menjadi %s"`, changer.Fullname, payload.Status),
				Icon:        changer.ProfilePhoto,
			})

			if err != nil {
				return err
			}
		}

		if sectorHasChanged {
			adminsRepresentative, err := uc.repoSQL.UserRepo().FetchAll(ctx, &userdomain.FilterUser{SectorID: &newCategory.SectorID})
			if err != nil {
				return err
			}

			for _, user := range adminsRepresentative {
				err := uc.service.AuthService.CreateNotification(ctx, auth.PayloadNotification{
					Title:       changer.Fullname,
					UserID:      user.ID,
					Description: fmt.Sprintf(`%s telah menjadikan %s sebagai PIC untuk Aduan %s"`, changer.Fullname, newCategory.Sector, existing.Title),
					Icon:        changer.ProfilePhoto,
				})
				if err != nil {
					return err
				}
			}
		}

		return nil
	})

}
