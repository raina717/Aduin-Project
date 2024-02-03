package repository

import (
	"context"
	"service-complaint/internal/modules/complaint/domain"
	"service-complaint/pkg/shared"
	shareddomain "service-complaint/pkg/shared/domain"
	"strings"
	"time"

	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/tracer"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func (r *complaintRepoSQL) FetchAllEvidence(ctx context.Context, filter *domain.FilterEvidence) (data []shareddomain.Evidence, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:FetchAllEvidence")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	if filter.OrderBy == "" {
		filter.OrderBy = "updated_at"
	}

	db := r.setFilterEvidence(shared.SetSpanToGorm(ctx, r.readDB), filter).Order(clause.OrderByColumn{
		Column: clause.Column{Name: filter.OrderBy},
		Desc:   strings.ToUpper(filter.Sort) == "DESC",
	})
	if filter.Limit >= 0 {
		db = db.Limit(filter.Limit).Offset(filter.CalculateOffset())
	}
	err = db.Find(&data).Error
	return
}

func (r *complaintRepoSQL) CountEvidence(ctx context.Context, filter *domain.FilterEvidence) (count int) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:CountEvidence")
	defer trace.Finish()

	var total int64
	r.setFilterEvidence(shared.SetSpanToGorm(ctx, r.readDB), filter).Model(&shareddomain.Evidence{}).Count(&total)
	count = int(total)

	trace.Log("count", count)
	return
}

func (r *complaintRepoSQL) FindEvidence(ctx context.Context, filter *domain.FilterEvidence) (result shareddomain.Evidence, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:FindEvidence")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	err = r.setFilterEvidence(shared.SetSpanToGorm(ctx, r.readDB), filter).First(&result).Error
	return
}

func (r *complaintRepoSQL) SaveEvidence(ctx context.Context, data *shareddomain.Evidence, updateOptions ...candishared.DBUpdateOptionFunc) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:SaveEvidence")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	db := r.writeDB
	if tx, ok := candishared.GetValueFromContext(ctx, candishared.ContextKeySQLTransaction).(*gorm.DB); ok {
		db = tx
	}
	data.UpdatedAt = time.Now()
	if data.CreatedAt.IsZero() {
		data.CreatedAt = time.Now()
	}
	if data.ID == 0 {
		err = shared.SetSpanToGorm(ctx, db).Omit(clause.Associations).Create(data).Error
	} else {
		err = shared.SetSpanToGorm(ctx, db).Model(data).Omit(clause.Associations).Updates(r.updateTools.ToMap(data, updateOptions...)).Error
	}
	return
}

func (r *complaintRepoSQL) DeleteEvidence(ctx context.Context, filter *domain.FilterEvidence) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:DeleteEvidence")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	db := r.writeDB
	if tx, ok := candishared.GetValueFromContext(ctx, candishared.ContextKeySQLTransaction).(*gorm.DB); ok {
		db = tx
	}
	err = r.setFilterEvidence(shared.SetSpanToGorm(ctx, db), filter).Delete(&shareddomain.Evidence{}).Error
	return
}

func (r *complaintRepoSQL) setFilterEvidence(db *gorm.DB, filter *domain.FilterEvidence) *gorm.DB {

	if filter.ID != nil {
		db = db.Where("id = ?", *filter.ID)
	}
	if filter.Search != "" {
		db = db.Where("(field ILIKE '%%' || ? || '%%')", filter.Search)
	}

	for _, preload := range filter.Preloads {
		db = db.Preload(preload)
	}

	return db
}
