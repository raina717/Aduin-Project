package auth

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/golangid/candi/candihelper"
	"github.com/golangid/candi/candiutils"
	"github.com/golangid/candi/tracer"
)

type authHTTP struct {
	host    string
	auth    string
	httpReq candiutils.HTTPRequest
}

func NewAuthService(host, auth string) AuthService {
	return &authHTTP{
		host: host,
		auth: auth,
		httpReq: candiutils.NewHTTPRequest(
			candiutils.HTTPRequestSetTLS(&tls.Config{InsecureSkipVerify: true}),
			candiutils.HTTPRequestSetRetries(0),
			candiutils.HTTPRequestSetHTTPErrorCodeThreshold(500),
		),
	}
}

func (s *authHTTP) CreateNotification(ctx context.Context, payload PayloadNotification) error {
	trace, ctx := tracer.StartTraceWithContext(ctx, "authHTTP:CreateNotification")
	defer trace.Finish()
	uri := fmt.Sprintf("%s/api/auth/v1/notification", s.host)
	headers := map[string]string{
		candihelper.HeaderContentType:   candihelper.HeaderMIMEApplicationJSON,
		candihelper.HeaderAuthorization: "Basic " + s.auth,
	}

	respBody, statusCode, err := s.httpReq.Do(ctx, http.MethodPost, uri, candihelper.ToBytes(payload), headers)
	if err != nil {
		return err
	}

	if statusCode != 201 {
		mapResponse := map[string]any{}

		json.Unmarshal(respBody, &mapResponse)

		if val, ok := mapResponse["message"]; ok {
			message, ok := val.(string)
			if ok {
				return errors.New(message)
			}
		}

	}

	return nil
}
