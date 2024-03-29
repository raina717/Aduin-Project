// Code generated by candi v1.16.3.

package repository

import (
	"context"

	"service-auth/internal/modules/user/domain"
	shareddomain "service-auth/pkg/shared/domain"

	"github.com/golangid/candi/candishared"
)

// UserRepository abstract interface
type UserRepository interface {
	FetchAll(ctx context.Context, filter *domain.FilterUser) ([]shareddomain.User, error)
	Count(ctx context.Context, filter *domain.FilterUser) int
	Find(ctx context.Context, filter *domain.FilterUser) (shareddomain.User, error)
	Save(ctx context.Context, data *shareddomain.User, updateOptions ...candishared.DBUpdateOptionFunc) error
	Delete(ctx context.Context, filter *domain.FilterUser) (err error)

	FetchAllSector(ctx context.Context, filter *domain.FilterSector) ([]shareddomain.Sector, error)
}
