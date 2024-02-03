package mail

import (
	"context"
	"service-auth/pkg/shared"

	"github.com/golangid/candi/tracer"
	"github.com/mailgun/mailgun-go/v4"
)

type emailMG struct {
	senderNoReply string
	mg            mailgun.Mailgun
}

// NewEmailMG
func NewEmailMG(privateKey, domain string) Email {
	mg := mailgun.NewMailgun(domain, privateKey)
	// mg.SetAPIBase(mailgun.APIBaseUS)

	return &emailMG{
		senderNoReply: shared.GetEnv().EmailSenderNoReply,
		mg:            mg,
	}
}

func (e *emailMG) SendEmail(ctx context.Context, payload *RequestPayloadEmail) error {
	trace, ctx := tracer.StartTraceWithContext(ctx, "emailMG:SendEmail")
	defer trace.Finish()

	from := e.senderNoReply
	if payload.From != "" {
		from = payload.From
	}

	message := e.mg.NewMessage(from, payload.Subject, "", payload.Recipients...)
	message.SetHtml(payload.Content)

	resp, id, err := e.mg.Send(ctx, message)
	if err != nil {
		return err
	}

	trace.Log("id", id)
	trace.Log("resp", resp)

	return nil
}
