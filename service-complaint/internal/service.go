// Code generated by candi v1.16.3.

package servicecomplaint

import (
	"github.com/golangid/candi/codebase/factory"
	"github.com/golangid/candi/codebase/factory/dependency"
	"github.com/golangid/candi/codebase/factory/types"
	"github.com/golangid/candi/config"

	"service-complaint/configs"
	"service-complaint/internal/modules/complaint"
	"service-complaint/internal/modules/user"
)

// Service model
type Service struct {
	cfg          *config.Config
	deps         dependency.Dependency
	applications []factory.AppServerFactory
	modules      []factory.ModuleFactory
	name         types.Service
}

// NewService in this service
func NewService(cfg *config.Config) factory.ServiceFactory {
	deps := configs.LoadServiceConfigs(cfg)

	modules := []factory.ModuleFactory{
		complaint.NewModule(deps),
		user.NewModule(deps),
	}

	s := &Service{
		cfg:     cfg,
		deps:    deps,
		modules: modules,
		name:    types.Service(cfg.ServiceName),
	}

	s.applications = configs.InitAppFromEnvironmentConfig(s)

	// Add custom application runner, must implement `factory.AppServerFactory` methods
	s.applications = append(s.applications, []factory.AppServerFactory{
		// customApplication
	}...)

	return s
}

// GetConfig method
func (s *Service) GetConfig() *config.Config {
	return s.cfg
}

// GetDependency method
func (s *Service) GetDependency() dependency.Dependency {
	return s.deps
}

// GetApplications method
func (s *Service) GetApplications() []factory.AppServerFactory {
	return s.applications
}

// GetModules method
func (s *Service) GetModules() []factory.ModuleFactory {
	return s.modules
}

// Name method
func (s *Service) Name() types.Service {
	return s.name
}
