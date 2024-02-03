// Code generated by candi v1.16.3.

package usecase

import (
	"context"
	"crypto/rsa"
	"service-complaint/pkg/shared"
	"service-complaint/pkg/shared/repository"
	"service-complaint/pkg/shared/usecase/common"

	"github.com/golang-jwt/jwt"
	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/codebase/factory/dependency"
	"github.com/golangid/candi/codebase/factory/types"
	"github.com/golangid/candi/codebase/interfaces"
)

// UserUsecase abstraction
type UserUsecase interface {
	ValidateToken(ctx context.Context, token string) (*candishared.TokenClaim, error)
}

type userUsecaseImpl struct {
	sharedUsecase common.Usecase
	repoSQL       repository.RepoSQL
	publisher     map[types.Worker]interfaces.Publisher

	rsaPrivateKey *rsa.PrivateKey
	rsaPublicKey  *rsa.PublicKey
	jwtParser     shared.JWTParser
	aesCrypto     shared.AESGcm
}

// NewUserUsecase usecase impl constructor
func NewUserUsecase(deps dependency.Dependency) (UserUsecase, func(sharedUsecase common.Usecase)) {
	uc := &userUsecaseImpl{
		repoSQL:       repository.GetSharedRepoSQL(),
		publisher:     make(map[types.Worker]interfaces.Publisher),
		rsaPrivateKey: deps.GetKey().PrivateKey(),
		rsaPublicKey:  deps.GetKey().PublicKey(),
		jwtParser:     &jwt.Parser{},
		aesCrypto:     deps.GetExtended(shared.TypeAESCrypto).(shared.AESGcm),
	}

	if kafkaBroker := deps.GetBroker(types.Kafka); kafkaBroker != nil {
		uc.publisher[types.Kafka] = kafkaBroker.GetPublisher()
	}
	return uc, func(sharedUsecase common.Usecase) {
		uc.sharedUsecase = sharedUsecase
	}
}
