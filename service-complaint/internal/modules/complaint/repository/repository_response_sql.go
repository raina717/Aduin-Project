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

func (r *complaintRepoSQL) FetchAllResponse(ctx context.Context, filter *domain.FilterResponse) (data []shareddomain.Response, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:FetchAllResponse")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	if filter.OrderBy == "" {
		filter.OrderBy = "updated_at"
	}

	db := r.setFilterResponse(shared.SetSpanToGorm(ctx, r.readDB), filter).Order(clause.OrderByColumn{
		Column: clause.Column{Name: filter.OrderBy},
		Desc:   strings.ToUpper(filter.Sort) == "DESC",
	})
	if filter.Limit >= 0 {
		db = db.Limit(filter.Limit).Offset(filter.CalculateOffset())
	}
	err = db.Find(&data).Error
	return
}

func (r *complaintRepoSQL) CountResponse(ctx context.Context, filter *domain.FilterResponse) (count int) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:CountResponse")
	defer trace.Finish()

	var total int64
	r.setFilterResponse(shared.SetSpanToGorm(ctx, r.readDB), filter).Model(&shareddomain.Response{}).Count(&total)
	count = int(total)

	trace.Log("count", count)
	return
}

func (r *complaintRepoSQL) FindResponse(ctx context.Context, filter *domain.FilterResponse) (result shareddomain.Response, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:FindResponse")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	err = r.setFilterResponse(shared.SetSpanToGorm(ctx, r.readDB), filter).First(&result).Error
	return
}

func (r *complaintRepoSQL) SaveResponse(ctx context.Context, data *shareddomain.Response, updateOptions ...candishared.DBUpdateOptionFunc) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:SaveResponse")
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

func (r *complaintRepoSQL) DeleteResponse(ctx context.Context, filter *domain.FilterResponse) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:DeleteResponse")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	db := r.writeDB
	if tx, ok := candishared.GetValueFromContext(ctx, candishared.ContextKeySQLTransaction).(*gorm.DB); ok {
		db = tx
	}
	err = r.setFilterResponse(shared.SetSpanToGorm(ctx, db), filter).Delete(&shareddomain.Response{}).Error
	return
}

func (r *complaintRepoSQL) setFilterResponse(db *gorm.DB, filter *domain.FilterResponse) *gorm.DB {

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
