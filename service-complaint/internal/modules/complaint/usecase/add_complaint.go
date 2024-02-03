package usecase

import (
	"context"
	"fmt"

	"service-complaint/internal/modules/complaint/domain"
	userdomain "service-complaint/internal/modules/user/domain"
	"service-complaint/pkg/helper"
	shareddomain "service-complaint/pkg/shared/domain"
	"service-complaint/pkg/shared/service/auth"

	"github.com/golangid/candi/candihelper"
	"github.com/golangid/candi/tracer"
)

func (uc *complaintUsecaseImpl) CreateComplaint(ctx context.Context, payload *domain.AddComplaint) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:CreateComplaint")
	defer trace.Finish()

	reporter, err := uc.repoSQL.UserRepo().Find(ctx, &userdomain.FilterUser{ID: &payload.UserID})
	if err != nil {
		return err
	}

	complaintCategory, err := uc.repoSQL.ComplaintRepo().FindCategory(ctx, &domain.FilterCategory{ID: &payload.CategoryID})
	if err != nil {
		return err
	}

	var complaint shareddomain.Complaint
	complaint.Title = payload.Title
	complaint.Description = payload.Description
	complaint.Location = payload.Location
	complaint.Date = payload.Date
	complaint.ComplaintNum = helper.GenerateComplaintNumber()
	complaint.IsAnonymous = payload.IsAnonymous
	complaint.CategoryID = payload.CategoryID
	complaint.Status = domain.Open
	complaint.UserID = payload.UserID

	for _, evidence := range payload.Evidences {
		complaint.Evidences = append(complaint.Evidences, shareddomain.Evidence{
			Type: evidence.Type,
			URL:  evidence.URL,
		})
	}

	err = uc.repoSQL.WithTransaction(ctx, func(ctx context.Context) error {
		err = uc.repoSQL.ComplaintRepo().Save(ctx, &complaint)
		if err != nil {
			return err
		}

		for _, evidence := range complaint.Evidences {
			evidence.ComplaintID = complaint.ID
			err = uc.repoSQL.ComplaintRepo().SaveEvidence(ctx, &evidence)
			if err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	filterUser := userdomain.FilterUser{
		RoleID:   candihelper.ToIntPtr(domain.RoleRepresentative),
		SectorID: &complaintCategory.SectorID,
		UseOr:    true,
	}

	listUsers, err := uc.repoSQL.UserRepo().FetchAll(ctx, &filterUser)
	if err != nil {
		return err
	}

	reporterName := reporter.Fullname
	reporterIcon := reporter.ProfilePhoto
	if complaint.IsAnonymous {
		reporterName = "Anonymous"
	}

	for _, user := range listUsers {
		err := uc.service.AuthService.CreateNotification(ctx, auth.PayloadNotification{
			Title:       "Aduan Baru",
			UserID:      user.ID,
			Description: fmt.Sprintf(`%s telah membuat aduan baru : %s "`, reporterName, complaint.Title),
			Icon:        reporterIcon,
		})
		if err != nil {
			return err
		}
	}

	return
}
