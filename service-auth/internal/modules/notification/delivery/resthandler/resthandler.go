// Code generated by candi v1.16.3.

package resthandler

import (
	"encoding/json"
	"io"
	"net/http"

	"service-auth/internal/modules/notification/domain"
	"service-auth/pkg/shared/usecase"

	"github.com/golangid/candi/candihelper"
	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/codebase/factory/dependency"
	"github.com/golangid/candi/codebase/interfaces"
	"github.com/golangid/candi/tracer"
	"github.com/golangid/candi/wrapper"
)

// RestHandler handler
type RestHandler struct {
	mw        interfaces.Middleware
	uc        usecase.Usecase
	validator interfaces.Validator
}

// NewRestHandler create new rest handler
func NewRestHandler(uc usecase.Usecase, deps dependency.Dependency) *RestHandler {
	return &RestHandler{
		uc: uc, mw: deps.GetMiddleware(), validator: deps.GetValidator(),
	}
}

// Mount handler with root "/"
// handling version in here
func (h *RestHandler) Mount(root interfaces.RESTRouter) {
	v1Notification := root.Group(candihelper.V1 + "/notification")

	v1Notification.GET("/me", h.getMyNotification, h.mw.HTTPBearerAuth)
	v1Notification.PUT("/", h.putNotification, h.mw.HTTPBearerAuth)
	v1Notification.POST("/", h.createNotification, h.mw.HTTPBasicAuth)
}

func (h *RestHandler) getMyNotification(rw http.ResponseWriter, req *http.Request) {
	trace, ctx := tracer.StartTraceWithContext(req.Context(), "NotificationDeliveryREST:getMyNotification")
	defer trace.Finish()

	tokenClaim := candishared.ParseTokenClaimFromContext(ctx) // must using HTTPBearerAuth in middleware for this handler

	var filter domain.FilterNotification
	if err := candihelper.ParseFromQueryParam(req.URL.Query(), &filter); err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, "Failed parse filter", err).JSON(rw)
		return
	}

	filter.UserID = candihelper.ToInt(tokenClaim.Subject)

	// if err := h.validator.ValidateDocument("notification/get_all", filter); err != nil {
	// 	wrapper.NewHTTPResponse(http.StatusBadRequest, "Failed validate filter", err).JSON(rw)
	// 	return
	// }

	data, meta, err := h.uc.Notification().GetAllNotification(ctx, filter)
	if err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	message := "Success"
	wrapper.NewHTTPResponse(http.StatusOK, message, meta, data).JSON(rw)
}

func (h *RestHandler) createNotification(rw http.ResponseWriter, req *http.Request) {
	trace, ctx := tracer.StartTraceWithContext(req.Context(), "NotificationDeliveryREST:CreateNotification")
	defer trace.Finish()

	body, _ := io.ReadAll(req.Body)
	// if err := h.validator.ValidateDocument("notification/save", body); err != nil {
	// 	wrapper.NewHTTPResponse(http.StatusBadRequest, "Failed validate payload", err).JSON(rw)
	// 	return
	// }

	var payload domain.RequestNotification
	if err := json.Unmarshal(body, &payload); err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	err := h.uc.Notification().CreateNotification(ctx, &payload)
	if err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	wrapper.NewHTTPResponse(http.StatusCreated, "Success").JSON(rw)
}

func (h *RestHandler) putNotification(rw http.ResponseWriter, req *http.Request) {
	trace, ctx := tracer.StartTraceWithContext(req.Context(), "NotificationDeliveryREST:putNotification")
	defer trace.Finish()

	body, _ := io.ReadAll(req.Body)
	// if err := h.validator.ValidateDocument("notification/save", body); err != nil {
	// 	wrapper.NewHTTPResponse(http.StatusBadRequest, "Failed validate payload", err).JSON(rw)
	// 	return
	// }

	var payload domain.RequestPutNotification
	if err := json.Unmarshal(body, &payload); err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	err := h.uc.Notification().PutNotification(ctx, &payload)
	if err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	wrapper.NewHTTPResponse(http.StatusCreated, "Success").JSON(rw)
}
