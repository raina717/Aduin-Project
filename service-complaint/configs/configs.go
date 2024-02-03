// Code generated by candi v1.16.3.

package configs

import (
	"context"
	"service-complaint/pkg/shared/service"
	"service-complaint/pkg/shared/service/auth"

	"service-complaint/configs/rsa"
	"service-complaint/pkg/shared"
	"service-complaint/pkg/shared/repository"
	"service-complaint/pkg/shared/usecase"

	"github.com/golangid/candi/broker"
	"github.com/golangid/candi/candihelper"
	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/codebase/factory/dependency"
	"github.com/golangid/candi/codebase/interfaces"
	"github.com/golangid/candi/config"
	"github.com/golangid/candi/config/database"

	"github.com/golangid/candi/logger"
	"github.com/golangid/candi/middleware"
	"github.com/golangid/candi/tracer"
	"github.com/golangid/candi/validator"
)

// LoadServiceConfigs load selected dependency configuration in this service
func LoadServiceConfigs(baseCfg *config.Config) (deps dependency.Dependency) {

	var sharedEnv shared.Environment
	candihelper.MustParseEnv(&sharedEnv)
	shared.SetEnv(sharedEnv)

	logger.InitZap()
	tracer.InitOpenTracing(baseCfg.ServiceName)

	baseCfg.LoadFunc(func(ctx context.Context) []interfaces.Closer {
		// redisDeps := database.InitRedis()
		sqlDeps := database.InitSQLDatabase()
		// locker := candiutils.NewRedisLocker(redisDeps.WritePool())

		brokerDeps := broker.InitBrokers(
		// broker.NewKafkaBroker(),
		// broker.NewRabbitMQBroker(),
		// broker.NewRedisBroker(redisDeps.WritePool()),
		)

		rsaKey := rsa.InitKey()

		// inject all service dependencies
		// See all option in dependency package
		deps = dependency.InitDependency(
			dependency.SetValidator(validator.NewValidator()),
			dependency.SetBrokers(brokerDeps.GetBrokers()),
			// dependency.SetLocker(locker),
			// dependency.SetRedisPool(redisDeps),
			dependency.SetSQLDatabase(sqlDeps),
			dependency.SetKey(rsaKey),
			dependency.AddExtended(shared.TypeAESCrypto, shared.NewAESGcm(sharedEnv.TokenEncryptionKey)),
			dependency.AddExtended(service.ServiceType, &service.Service{
				AuthService: auth.NewAuthService(sharedEnv.ServiceAuthHost, sharedEnv.ServiceAuthKey),
			}),
			// dependency.SetMongoDatabase(mongoDeps),
			// ... add more dependencies
		)
		return []interfaces.Closer{ // throw back to base config for close connection when application shutdown
			// brokerDeps,
			// locker,
			// redisDeps,
			sqlDeps,
			// mongoDeps,
		}
	})

	repository.SetSharedRepository(deps)
	usecase.SetSharedUsecase(deps)

	deps.SetMiddleware(middleware.NewMiddlewareWithOption(
		middleware.SetTokenValidator(usecase.GetSharedUsecase().User()),
		middleware.SetACLPermissionChecker(&shared.DefaultMiddleware{}),
		middleware.SetUserIDExtractor(func(tokenClaim *candishared.TokenClaim) (userID string) {
			return tokenClaim.Subject
		}),
	))

	return deps
}