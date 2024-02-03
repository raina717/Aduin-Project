package service

import "service-complaint/pkg/shared/service/auth"

const (
	// ServiceType const
	ServiceType = "service-type"
)

// Service external
type Service struct {
	AuthService auth.AuthService
}
