package repository

import (
	"context"
	"service-auth/internal/modules/user/domain"
	"service-auth/pkg/shared"
	shareddomain "service-auth/pkg/shared/domain"
	"strings"

	"github.com/golangid/candi/tracer"
	"gorm.io/gorm/clause"
)

func (r *userRepoSQL) FetchAllSector(ctx context.Context, filter *domain.FilterSector) (data []shareddomain.Sector, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "UserRepoSQL:FetchAllSector")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	if filter.OrderBy == "" {
		filter.OrderBy = "id"
	}

	db := shared.SetSpanToGorm(ctx, r.readDB).Order(clause.OrderByColumn{
		Column: clause.Column{Name: filter.OrderBy},
		Desc:   strings.ToUpper(filter.Sort) == "DESC",
	})
	if filter.Limit > 0 {
		db = db.Limit(filter.Limit).Offset(filter.CalculateOffset())
	}
	err = db.Find(&data).Error
	return
}
