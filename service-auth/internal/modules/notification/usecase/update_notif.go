package usecase

import (
	"context"
	"service-auth/internal/modules/notification/domain"

	"github.com/golangid/candi/tracer"
)

func (uc *notificationUsecaseImpl) PutNotification(ctx context.Context, req *domain.RequestPutNotification) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "NotificationUsecase:PutNotification")
	defer trace.Finish()

	filterNotif := domain.FilterNotification{
		UserID: req.UserID,
		IDs:    req.NotifIds,
	}

	notifications, _ := uc.repoSQL.NotificationRepo().FetchAll(ctx, &filterNotif)

	return uc.repoSQL.WithTransaction(ctx, func(ctx context.Context) error {
		for _, notif := range notifications {
			notif.IsRead = req.IsRead
			err := uc.repoSQL.NotificationRepo().Save(ctx, &notif)
			if err != nil {
				return err
			}
		}

		return nil
	})

}
