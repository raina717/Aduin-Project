// Code generated by candi v1.16.3.

package configs

import (
	"context"

	"service-auth/configs/rsa"
	"service-auth/pkg/shared"
	"service-auth/pkg/shared/repository"
	"service-auth/pkg/shared/service"
	"service-auth/pkg/shared/service/mail"
	"service-auth/pkg/shared/usecase"

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
		sqlDeps := database.InitSQLDatabase()
		// mongoDeps := database.InitMongoDB(ctx)
		// locker := &candiutils.NoopLocker{}

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
			dependency.SetSQLDatabase(sqlDeps),
			dependency.SetKey(rsaKey),
			dependency.AddExtended(shared.TypeAESCrypto, shared.NewAESGcm(sharedEnv.TokenEncryptionKey)),
			// ... add more dependencies
			dependency.AddExtended(service.ServiceType, &service.Service{
				// Mail: mail.NewEmailMG(sharedEnv.MailgunPrivateKey, sharedEnv.MailgunDomain),
				Mail: mail.NewEmailSMTP(sharedEnv.SMTPUsername, sharedEnv.SMTPPassword, sharedEnv.SMTPHost, sharedEnv.SMTPPort),
			}),
		)
		return []interfaces.Closer{ // throw back to base config for close connection when application shutdown
			// brokerDeps,
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
		// middleware.SetCache(deps.GetRedisPool().Cache(), middleware.DefaultCacheAge),
	))

	return deps
}