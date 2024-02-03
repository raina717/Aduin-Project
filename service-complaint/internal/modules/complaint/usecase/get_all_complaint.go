package usecase

import (
	"context"

	"service-complaint/internal/modules/complaint/domain"
	userdomain "service-complaint/internal/modules/user/domain"

	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/tracer"
	"gorm.io/gorm"
)

func (uc *complaintUsecaseImpl) GetAllComplaint(ctx context.Context, filter domain.FilterComplaint) (results []domain.ResponseDetailComplaint, meta domain.GetAllComplaintMeta, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:GetAllComplaint")
	defer trace.Finish()

	user, err := uc.repoSQL.UserRepo().Find(ctx, &userdomain.FilterUser{ID: &filter.UserID})
	if err != nil && err != gorm.ErrRecordNotFound {
		return results, meta, err
	}

	if (user.RoleID == domain.RoleRepresentative || user.RoleID == domain.RoleAdminRepresentative) && user.SectorID != 0 {
		filter.SectorID = user.SectorID
	}

	filter.Preloads = []string{"User", "Comments", "Comments.User", "Responses", "Responses.User", "Evidences", "Likes", "Likes.User", "Category"}

	if filter.IsViral {
		filter.Sort = "DESC"
		filter.OrderBy = "like_count"
	}

	if !filter.ShowCurrentUser {
		filter.UserID = 0
	}

	if filter.SubmittedBy != 0 {
		filter.UserID = filter.SubmittedBy
	}

	mapStatus := map[string]int{
		domain.Open:       0,
		domain.InProgress: 0,
		domain.Done:       0,
		domain.Rejected:   0,
	}

	filterAggs := filter
	filterAggs.Status = ""

	aggregateStatuses, _ := uc.repoSQL.ComplaintRepo().AggregateStatuses(ctx, &filterAggs)
	for _, v := range aggregateStatuses {
		if _, ok := mapStatus[v.Status]; ok {
			mapStatus[v.Status] = v.Count
		}
	}

	for k, v := range mapStatus {
		meta.Aggregations.Statuses = append(meta.Aggregations.Statuses, domain.MetaComplaintStatusAggs{Status: k, Count: v})
	}

	data, err := uc.repoSQL.ComplaintRepo().FetchAll(ctx, &filter)
	if err != nil {
		return results, meta, err
	}
	count := uc.repoSQL.ComplaintRepo().Count(ctx, &filter)
	meta.Meta = candishared.NewMeta(filter.Page, filter.Limit, count)

	for _, complaint := range data {
		var resp domain.ResponseDetailComplaint
		resp.Serialize(complaint)

		for _, like := range complaint.Likes {
			if like.UserID == user.ID {
				resp.IsLiked = true
			}
		}
		results = append(results, resp)
	}

	return
}
