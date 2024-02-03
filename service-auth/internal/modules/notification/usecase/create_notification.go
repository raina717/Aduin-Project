package usecase

import (
	"context"

	"service-auth/internal/modules/notification/domain"
	shareddomain "service-auth/pkg/shared/domain"

	"github.com/golangid/candi/tracer"
)

func (uc *notificationUsecaseImpl) CreateNotification(ctx context.Context, req *domain.RequestNotification) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "NotificationUsecase:CreateNotification")
	defer trace.Finish()

	var notif shareddomain.Notification

	notif.Title = req.Title
	notif.Description = req.Description
	notif.Icon = req.Icon
	notif.UserID = req.UserID
	notif.IsRead = false

	err = uc.repoSQL.NotificationRepo().Save(ctx, &notif)

	return
}
