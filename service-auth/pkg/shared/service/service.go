package service

import "service-auth/pkg/shared/service/mail"

const (
	// ServiceType const
	ServiceType = "service-type"
)

// Service external
type Service struct {
	Mail mail.Email
}
