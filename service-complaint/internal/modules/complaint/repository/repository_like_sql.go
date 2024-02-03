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

func (r *complaintRepoSQL) FetchAllLike(ctx context.Context, filter *domain.FilterLike) (data []shareddomain.Like, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:FetchAllLike")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	if filter.OrderBy == "" {
		filter.OrderBy = "updated_at"
	}

	db := r.setFilterLike(shared.SetSpanToGorm(ctx, r.readDB), filter).Order(clause.OrderByColumn{
		Column: clause.Column{Name: filter.OrderBy},
		Desc:   strings.ToUpper(filter.Sort) == "DESC",
	})
	if filter.Limit >= 0 {
		db = db.Limit(filter.Limit).Offset(filter.CalculateOffset())
	}
	err = db.Find(&data).Error
	return
}

func (r *complaintRepoSQL) CountLike(ctx context.Context, filter *domain.FilterLike) (count int) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:CountLike")
	defer trace.Finish()

	var total int64
	r.setFilterLike(shared.SetSpanToGorm(ctx, r.readDB), filter).Model(&shareddomain.Like{}).Count(&total)
	count = int(total)

	trace.Log("count", count)
	return
}

func (r *complaintRepoSQL) FindLike(ctx context.Context, filter *domain.FilterLike) (result shareddomain.Like, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:FindLike")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	err = r.setFilterLike(shared.SetSpanToGorm(ctx, r.readDB), filter).First(&result).Error
	return
}

func (r *complaintRepoSQL) SaveLike(ctx context.Context, data *shareddomain.Like, updateOptions ...candishared.DBUpdateOptionFunc) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:SaveLike")
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

func (r *complaintRepoSQL) DeleteLike(ctx context.Context, filter *domain.FilterLike) (err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintRepoSQL:DeleteLike")
	defer func() { trace.Finish(tracer.FinishWithError(err)) }()

	db := r.writeDB
	if tx, ok := candishared.GetValueFromContext(ctx, candishared.ContextKeySQLTransaction).(*gorm.DB); ok {
		db = tx
	}
	err = r.setFilterLike(shared.SetSpanToGorm(ctx, db), filter).Delete(&shareddomain.Like{}).Error
	return
}

func (r *complaintRepoSQL) setFilterLike(db *gorm.DB, filter *domain.FilterLike) *gorm.DB {

	if filter.ID != nil {
		db = db.Where("id = ?", *filter.ID)
	}
	if filter.Search != "" {
		db = db.Where("(field ILIKE '%%' || ? || '%%')", filter.Search)
	}

	if filter.ComplaintID != 0 {
		db = db.Where("complaint_id = ?", filter.ComplaintID)
	}

	if filter.UserID != 0 {
		db = db.Where("user_id = ?", filter.UserID)
	}

	for _, preload := range filter.Preloads {
		db = db.Preload(preload)
	}

	return db
}
