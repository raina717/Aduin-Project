package usecase

import (
	"context"

	"service-complaint/internal/modules/complaint/domain"

	"github.com/golangid/candi/tracer"
)

func (uc *complaintUsecaseImpl) GetDetailComplaint(ctx context.Context, payload domain.GetDetailComplaint) (resp domain.ResponseDetailComplaint, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:GetDetailComplaint")
	defer trace.Finish()

	repoFilter := domain.FilterComplaint{ID: &payload.ComplaintID}
	repoFilter.Preloads = []string{"User", "Comments", "Comments.User", "Responses", "Responses.User", "Responses.User.Role", "Evidences", "Likes", "Likes.User", "Category"}
	complaint, err := uc.repoSQL.ComplaintRepo().Find(ctx, &repoFilter)
	if err != nil {
		return resp, err
	}

	resp.Serialize(complaint)
	for _, like := range complaint.Likes {
		if like.UserID == payload.UserID {
			resp.IsLiked = true
		}
	}

	for _, cmnt := range complaint.Comments {
		resp.Comments = append(resp.Comments, domain.ListComment{
			SubmitedBy:   cmnt.User.Fullname,
			ProfilePhoto: cmnt.User.ProfilePhoto,
			Comment:      cmnt.Description,
			CreatedAt:    cmnt.CreatedAt,
		})
	}

	for _, response := range complaint.Responses {
		resp.Responses = append(resp.Responses, domain.ListResponse{
			SubmitedBy:   response.User.Fullname,
			ProfilePhoto: response.User.ProfilePhoto,
			Description:  response.Description,
			Role:         response.User.Role.RoleName,
			CreatedAt:    response.CreatedAt,
		})
	}

	return
}
