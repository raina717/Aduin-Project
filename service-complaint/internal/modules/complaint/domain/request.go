package domain

import (
	shareddomain "service-complaint/pkg/shared/domain"
	"time"
)

// RequestComplaint model
type RequestComplaint struct {
	ID    int    `json:"id"`
	Field string `json:"field"`
}

// Deserialize to db model
func (r *RequestComplaint) Deserialize() (res shareddomain.Complaint) {
	// res.Field = r.Field
	return
}

type (
	AddComplaint struct {
		Title       string     `json:"title"`
		Description string     `json:"description"`
		Location    string     `json:"location"`
		Date        time.Time  `json:"date"`
		CategoryID  int        `json:"category_id"`
		Evidences   []Evidence `json:"evidences"`
		IsAnonymous bool       `json:"is_anonymous"`
		UserID      int        `json:"-"`
	}

	Evidence struct {
		URL  string `json:"url"`
		Type string `json:"type"`
	}
)

type AddComplaintResponse struct {
	ComplaintID int    `json:"complaint_id"`
	Description string `json:"description"`
	UserID      int    `json:"-"`
}

type AddComment struct {
	ComplaintID int    `json:"complaint_id"`
	Description string `json:"description"`
	UserID      int    `json:"-"`
}

type PutLike struct {
	ComplaintID int
	UserID      int
}

type UpdateComplaint struct {
	ComplaintID int    `json:"complaint_id"`
	CategoryID  int    `json:"category_id"`
	Status      string `json:"status"`

	ChangedBy int `json:"-"`
}

type UploadRequest struct {
	Filename    string `json:"filename"`
	FileSize    int64  `json:"fileSize"`
	ContentType string `json:"contentType"`
	ComplaintID int    `json:"complaint_id"`
	UserID      int    `json:"-"`
}

type GetDetailComplaint struct {
	UserID      int `json:"-"`
	ComplaintID int `json:"complaint_id"`
}
