package workerhandler

import (
	"fmt"
	"service-complaint/internal/modules/complaint/domain"
	"service-complaint/pkg/shared/usecase"

	"github.com/golangid/candi/candishared"
	cronworker "github.com/golangid/candi/codebase/app/cron_worker"
	"github.com/golangid/candi/codebase/factory/dependency"
	"github.com/golangid/candi/codebase/factory/types"
	"github.com/golangid/candi/tracer"
)

type CronHandler struct {
	uc usecase.Usecase
}

func NewCronHandler(uc usecase.Usecase, deps dependency.Dependency) *CronHandler {
	return &CronHandler{
		uc: uc,
	}
}

func (h *CronHandler) MountHandlers(group *types.WorkerHandlerGroup) {
	group.Add(cronworker.CreateCronJobKey(domain.CronJobWorkerCloseOpenComplaint, "", "*/10 * * * *"), h.handleCloseOpenComplaint)
}

func (h *CronHandler) handleCloseOpenComplaint(eventContext *candishared.EventContext) error {
	trace, ctx := tracer.StartTraceWithContext(eventContext.Context(), "CronHandler:handleCloseOpenComplaint")
	defer trace.Finish()

	fmt.Printf("cron: execute in handler %s, message: %s\n", eventContext.HandlerRoute(), eventContext.Message())

	return h.uc.Complaint().WorkerCloseComplaint(ctx)
}
