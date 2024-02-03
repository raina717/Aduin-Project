package usecase

import (
	"context"

	"service-auth/internal/modules/notification/domain"
	shareddomain "service-auth/pkg/shared/domain"

	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/tracer"
)

func (uc *notificationUsecaseImpl) GetAllNotification(ctx context.Context, filter domain.FilterNotification) (results []shareddomain.Notification, meta candishared.Meta, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "NotificationUsecase:GetAllNotification")
	defer trace.Finish()

	results, err = uc.repoSQL.NotificationRepo().FetchAll(ctx, &filter)
	if err != nil {
		return results, meta, err
	}

	count := uc.repoSQL.NotificationRepo().Count(ctx, &filter)
	meta = candishared.NewMeta(filter.Page, filter.Limit, count)

	return
}
