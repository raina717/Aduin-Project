package usecase

import (
	"context"
	"fmt"
	"service-complaint/internal/modules/complaint/domain"
	"service-complaint/pkg/shared"
	"service-complaint/pkg/shared/service/auth"
	"time"

	"github.com/golangid/candi/tracer"
)

func (uc *complaintUsecaseImpl) WorkerCloseComplaint(ctx context.Context) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:WorkerCloseComplaint")
	defer trace.Finish()

	filter := domain.FilterComplaint{}
	filter.ShowAll = true
	filter.Status = domain.Open

	filter.Preloads = []string{"User"}

	complaints, err := uc.repoSQL.ComplaintRepo().FetchAll(ctx, &filter)
	if err != nil {
		return err
	}

	for _, c := range complaints {
		deadline := c.Date.Add(shared.GetEnv().ComplaintOpenAge)

		if time.Now().After(deadline) {
			c.Status = domain.Rejected

			uc.repoSQL.ComplaintRepo().Save(ctx, &c)
			uc.service.AuthService.CreateNotification(ctx, auth.PayloadNotification{
				Title:       "Sistem Adu.in",
				UserID:      c.UserID,
				Description: fmt.Sprintf(`Aduan %s  secara otomatis ditolak karna sudah melewati batas waktu yang telah ditentukan`, c.Title),
				Icon:        "",
			})

		}
	}

	return nil

}
