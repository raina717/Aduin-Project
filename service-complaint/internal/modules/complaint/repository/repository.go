// Code generated by candi v1.16.3.

package repository

import (
	"context"

	"service-complaint/internal/modules/complaint/domain"
	shareddomain "service-complaint/pkg/shared/domain"

	"github.com/golangid/candi/candishared"
	"gorm.io/gorm"
)

// ComplaintRepository abstract interface
type ComplaintRepository interface {
	FetchAll(ctx context.Context, filter *domain.FilterComplaint) ([]shareddomain.Complaint, error)
	Count(ctx context.Context, filter *domain.FilterComplaint) int
	AggregateStatuses(ctx context.Context, filter *domain.FilterComplaint) ([]domain.MetaComplaintStatusAggs, error)
	Find(ctx context.Context, filter *domain.FilterComplaint) (shareddomain.Complaint, error)
	Save(ctx context.Context, data *shareddomain.Complaint, updateOptions ...candishared.DBUpdateOptionFunc) error
	Delete(ctx context.Context, filter *domain.FilterComplaint) (err error)

	FetchAllEvidence(ctx context.Context, filter *domain.FilterEvidence) ([]shareddomain.Evidence, error)
	CountEvidence(ctx context.Context, filter *domain.FilterEvidence) int
	FindEvidence(ctx context.Context, filter *domain.FilterEvidence) (shareddomain.Evidence, error)
	SaveEvidence(ctx context.Context, data *shareddomain.Evidence, updateOptions ...candishared.DBUpdateOptionFunc) error
	DeleteEvidence(ctx context.Context, filter *domain.FilterEvidence) (err error)

	FetchAllResponse(ctx context.Context, filter *domain.FilterResponse) ([]shareddomain.Response, error)
	CountResponse(ctx context.Context, filter *domain.FilterResponse) int
	FindResponse(ctx context.Context, filter *domain.FilterResponse) (shareddomain.Response, error)
	SaveResponse(ctx context.Context, data *shareddomain.Response, updateOptions ...candishared.DBUpdateOptionFunc) error
	DeleteResponse(ctx context.Context, filter *domain.FilterResponse) (err error)

	FetchAllComment(ctx context.Context, filter *domain.FilterComment) ([]shareddomain.Comment, error)
	CountComment(ctx context.Context, filter *domain.FilterComment) int
	FindComment(ctx context.Context, filter *domain.FilterComment) (shareddomain.Comment, error)
	SaveComment(ctx context.Context, data *shareddomain.Comment, updateOptions ...candishared.DBUpdateOptionFunc) error
	DeleteComment(ctx context.Context, filter *domain.FilterComment) (err error)

	FetchAllLike(ctx context.Context, filter *domain.FilterLike) ([]shareddomain.Like, error)
	CountLike(ctx context.Context, filter *domain.FilterLike) int
	FindLike(ctx context.Context, filter *domain.FilterLike) (shareddomain.Like, error)
	SaveLike(ctx context.Context, data *shareddomain.Like, updateOptions ...candishared.DBUpdateOptionFunc) error
	DeleteLike(ctx context.Context, filter *domain.FilterLike) (err error)

	FetchAllCategory(ctx context.Context, filter *domain.FilterCategory) ([]shareddomain.Category, error)
	CountCategory(ctx context.Context, filter *domain.FilterCategory) int
	FindCategory(ctx context.Context, filter *domain.FilterCategory) (shareddomain.Category, error)
	SaveCategory(ctx context.Context, data *shareddomain.Category, updateOptions ...candishared.DBUpdateOptionFunc) error
	DeleteCategory(ctx context.Context, filter *domain.FilterCategory) (err error)
}

type complaintRepoSQL struct {
	readDB, writeDB *gorm.DB
	updateTools     *candishared.DBUpdateTools
}

// NewComplaintRepoSQL mongo repo constructor
func NewComplaintRepoSQL(readDB, writeDB *gorm.DB) ComplaintRepository {
	return &complaintRepoSQL{
		readDB: readDB, writeDB: writeDB,
		updateTools: &candishared.DBUpdateTools{
			KeyExtractorFunc: candishared.DBUpdateGORMExtractorKey, IgnoredFields: []string{"id"},
		},
	}
}
