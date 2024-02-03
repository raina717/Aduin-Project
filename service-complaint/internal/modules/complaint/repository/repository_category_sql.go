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

func (r *complaintRepoSQL) FetchAllCategory(ctx context.Context, filter *domain.FilterCategory) (data []shareddomain.Category, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:FetchAllCategory")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	if filter.OrderBy == "" {
		filter.OrderBy = "updated_at"
	}

	db := r.setFilterCategory(shared.SetSpanToGorm(ctx, r.readDB), filter).Order(clause.OrderByColumn{
		Column: clause.Column{Name: filter.OrderBy},
		Desc:   strings.ToUpper(filter.Sort) == "DESC",
	})
	// if filter.Limit >= 0 {
	// 	db = db.Limit(filter.Limit).Offset(filter.CalculateOffset())
	// }

	err = db.Find(&data).Error
	return
}

func (r *complaintRepoSQL) CountCategory(ctx context.Context, filter *domain.FilterCategory) (count int) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:CountCategory")
	defer trace.Finish()

	var total int64
	r.setFilterCategory(shared.SetSpanToGorm(ctx, r.readDB), filter).Model(&shareddomain.Category{}).Count(&total)
	count = int(total)

	trace.Log("count", count)
	return
}

func (r *complaintRepoSQL) FindCategory(ctx context.Context, filter *domain.FilterCategory) (result shareddomain.Category, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:FindCategory")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	err = r.setFilterCategory(shared.SetSpanToGorm(ctx, r.readDB), filter).First(&result).Error
	return
}

func (r *complaintRepoSQL) SaveCategory(ctx context.Context, data *shareddomain.Category, updateOptions ...candishared.DBUpdateOptionFunc) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:SaveCategory")
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

func (r *complaintRepoSQL) DeleteCategory(ctx context.Context, filter *domain.FilterCategory) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:DeleteCategory")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	db := r.writeDB
	if tx, ok := candishared.GetValueFromContext(ctx, candishared.ContextKeySQLTransaction).(*gorm.DB); ok {
		db = tx
	}
	err = r.setFilterCategory(shared.SetSpanToGorm(ctx, db), filter).Delete(&shareddomain.Category{}).Error
	return
}

func (r *complaintRepoSQL) setFilterCategory(db *gorm.DB, filter *domain.FilterCategory) *gorm.DB {

	if filter.ID != nil {
		db = db.Where("id = ?", *filter.ID)
	}
	if filter.Search != "" {
		db = db.Where("(field ICategory '%%' || ? || '%%')", filter.Search)
	}

	for _, preload := range filter.Preloads {
		db = db.Preload(preload)
	}

	return db
}
