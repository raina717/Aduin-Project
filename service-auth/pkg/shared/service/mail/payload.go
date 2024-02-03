package mail

import "context"

type Email interface {
	SendEmail(ctx context.Context, payload *RequestPayloadEmail) error
}
