package domain

import (
	"service-complaint/pkg/helper"
	shareddomain "service-complaint/pkg/shared/domain"
	"time"

	"github.com/golangid/candi/candishared"
)

type (
	ResponseDetailComplaint struct {
		ComplaintID  int    `json:"complaint_id"`
		ComplaintNum string `json:"complaint_num"`
		SubmitedBy   struct {
			Name   string `json:"name"`
			Photo  string `json:"profile_photo"`
			UserID int    `json:"user_id"`
		} `json:"submited_by"`
		Title       string `json:"title"`
		Description string `json:"description"`
		Category    struct {
			ID   int    `json:"category_id"`
			Name string `json:"category_name"`
		} `json:"category"`
		Location      string         `json:"location"`
		Status        string         `json:"status"`
		IsAnonymous   bool           `json:"is_anonymous"`
		ComplaintDate string         `json:"complaint_date"`
		ComplaintTime string         `json:"complaint_hour"`
		Date          time.Time      `json:"date"`
		CreatedAt     time.Time      `json:"created_at"`
		UpdatedAt     time.Time      `json:"updated_at"`
		LikeCount     int            `json:"like_count"`
		Responses     []ListResponse `json:"responses"`
		ResponseCount int            `json:"response_count"`
		IsLiked       bool           `json:"is_liked"`
		Comments      []ListComment  `json:"comments"`
		CommentCount  int            `json:"comment_count"`
		ShareCount    int            `json:"share_count"`
		Evidences     []ListEvidence `json:"evidences"`
	}

	ListEvidence struct {
		URL  string `json:"url"`
		Type string `json:"type"`
	}

	ListComment struct {
		SubmitedBy   string    `json:"submited_by"`
		ProfilePhoto string    `json:"profile_photo"`
		Comment      string    `json:"comment"`
		CreatedAt    time.Time `json:"created_at"`
	}

	ListResponse struct {
		SubmitedBy   string    `json:"submited_by"`
		Role         string    `json:"role"`
		ProfilePhoto string    `json:"profile_photo"`
		Description  string    `json:"description"`
		CreatedAt    time.Time `json:"created_at"`
	}

	GetAllComplaintMeta struct {
		candishared.Meta
		Aggregations struct {
			Statuses []MetaComplaintStatusAggs `json:"statuses"`
		} `json:"aggregations"`
	}

	MetaComplaintStatusAggs struct {
		Status string `json:"status"`
		Count  int    `json:"count"`
	}
)

func (r *ResponseDetailComplaint) Serialize(source shareddomain.Complaint) {
	r.ComplaintID = source.ID
	r.ComplaintNum = source.ComplaintNum
	r.Title = source.Title
	r.Description = source.Description
	r.Location = source.Location
	r.IsAnonymous = source.IsAnonymous
	r.Date = source.Date
	r.ComplaintDate = helper.ToIndonesianDateFormat(source.Date)
	r.ComplaintTime = source.Date.Format("15:04")

	r.Category.ID = source.Category.ID
	r.Category.Name = source.Category.Name

	r.Status = source.Status
	r.CreatedAt = source.CreatedAt
	r.UpdatedAt = source.UpdatedAt

	if !source.IsAnonymous {
		r.SubmitedBy.Name = source.User.Fullname
		r.SubmitedBy.Photo = source.User.ProfilePhoto
		r.SubmitedBy.UserID = source.User.ID
	}

	for _, evidence := range source.Evidences {
		r.Evidences = append(r.Evidences, ListEvidence{
			Type: evidence.Type,
			URL:  evidence.URL,
		})
	}

	r.CommentCount = len(source.Comments)
	r.ShareCount = source.ShareCount
	r.ResponseCount = len(source.Responses)

	r.LikeCount = len(source.Likes)

}

type UploadResponse struct {
	Path string `json:"path"`
	URL  string `json:"url"`
}
