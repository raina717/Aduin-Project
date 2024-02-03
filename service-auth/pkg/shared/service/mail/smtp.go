package mail

import (
	"context"
	"fmt"
	"net/smtp"
	"service-auth/pkg/shared"
	"strings"

	"github.com/golangid/candi/tracer"
)

type emailSMTP struct {
	senderNoReply string
	addr          string
	auth          smtp.Auth
}

// NewEmailMG
func NewEmailSMTP(username, password, smtpHost string, smtpPort int) Email {

	return &emailSMTP{
		auth:          smtp.PlainAuth("", username, password, smtpHost),
		addr:          fmt.Sprintf("%s:%d", smtpHost, smtpPort),
		senderNoReply: shared.GetEnv().EmailSenderNoReply,
	}
}

func (e *emailSMTP) SendEmail(ctx context.Context, payload *RequestPayloadEmail) error {
	trace, _ := tracer.StartTraceWithContext(ctx, "emailSMTP:SendEmail")
	defer trace.Finish()

	from := e.senderNoReply
	if payload.From != "" {
		from = payload.From
	}

	message := fmt.Sprintf(`From: %s
To: %s
Subject: %s
MIME-version: 1.0;
Content-Type: text/html; charset="UTF-8";

%s`,
		from,
		strings.Join(payload.Recipients, ","),
		payload.Subject,
		payload.Content,
	)

	err := smtp.SendMail(e.addr, e.auth, from, payload.Recipients, []byte(message))
	if err != nil {
		return err
	}

	return nil
}
