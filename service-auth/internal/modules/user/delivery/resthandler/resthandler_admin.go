package resthandler

import (
	"encoding/json"
	"io"
	"net/http"
	"service-auth/internal/modules/user/domain"

	"github.com/golangid/candi/candihelper"
	"github.com/golangid/candi/tracer"
	"github.com/golangid/candi/wrapper"
)

func (h *RestHandler) getAllUser(rw http.ResponseWriter, req *http.Request) {
	trace, ctx := tracer.StartTraceWithContext(req.Context(), "UserDeliveryREST:GetAllUser")
	defer trace.Finish()

	// tokenClaim := candishared.ParseTokenClaimFromContext(ctx)

	var filter domain.FilterUser
	if err := candihelper.ParseFromQueryParam(req.URL.Query(), &filter); err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, "Failed parse filter", err).JSON(rw)
		return
	}

	if err := h.validator.ValidateDocument("user/get_all", filter); err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, "Failed validate filter", err).JSON(rw)
		return
	}

	data, meta, err := h.uc.User().GetAllUser(ctx, &filter)
	if err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	message := "Success"
	wrapper.NewHTTPResponse(http.StatusOK, message, meta, data).JSON(rw)
}

func (h *RestHandler) createAdmin(rw http.ResponseWriter, req *http.Request) {
	trace, ctx := tracer.StartTraceWithContext(req.Context(), "UserDeliveryREST:createAdmin")
	defer trace.Finish()

	body, _ := io.ReadAll(req.Body)
	// if err := h.validator.ValidateDocument("user/save", body); err != nil {
	// 	wrapper.NewHTTPResponse(http.StatusBadRequest, "Failed validate payload", err).JSON(rw)
	// 	return
	// }

	var payload domain.AddAdminPayload
	if err := json.Unmarshal(body, &payload); err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	err := h.uc.User().CreateAdmin(ctx, &payload)
	if err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	wrapper.NewHTTPResponse(http.StatusCreated, "Success").JSON(rw)
}

func (h *RestHandler) updateAdmin(rw http.ResponseWriter, req *http.Request) {
	trace, ctx := tracer.StartTraceWithContext(req.Context(), "UserDeliveryREST:updateAdmin")
	defer trace.Finish()

	body, _ := io.ReadAll(req.Body)
	// if err := h.validator.ValidateDocument("user/save", body); err != nil {
	// 	wrapper.NewHTTPResponse(http.StatusBadRequest, "Failed validate payload", err).JSON(rw)
	// 	return
	// }

	var payload domain.UpdateUserPayload
	if err := json.Unmarshal(body, &payload); err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	err := h.uc.User().UpdateUser(ctx, &payload)
	if err != nil {
		wrapper.NewHTTPResponse(http.StatusBadRequest, err.Error()).JSON(rw)
		return
	}

	wrapper.NewHTTPResponse(http.StatusCreated, "Success").JSON(rw)
}
