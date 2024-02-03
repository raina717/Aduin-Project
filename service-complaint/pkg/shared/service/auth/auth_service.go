package auth

import "context"

type AuthService interface {
	CreateNotification(ctx context.Context, payload PayloadNotification) error
}
