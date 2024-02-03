package domain

import (
	shareddomain "service-auth/pkg/shared/domain"
	"time"
)

// ResponseUser model
type ResponseUser struct {
	ID        int    `json:"id"`
	Field     string `json:"field"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

// Serialize from db model
func (r *ResponseUser) Serialize(source *shareddomain.User) {
	r.ID = source.ID
	// r.Field = source.Field
	r.CreatedAt = source.CreatedAt.Format(time.RFC3339)
	r.UpdatedAt = source.UpdatedAt.Format(time.RFC3339)
}

type LoginResponse struct {
	Token                     string            `json:"token"`
	ExpiredTokenTimeInMinutes float64           `json:"expiredTokenTimeInMinutes"`
	User                      shareddomain.User `json:"user"`
	// RefreshToken                     string            `json:"refresh_token"`
	// ExpiredRefreshTokenTimeInMinutes float64           `json:"expiredRefreshTokenTimeInMinutes"`
}

type DetailUserResponse struct {
	UserID         int    `json:"user_id"`
	Fullname       string `json:"fullname"`
	Email          string `json:"email"`
	ProfilePhoto   string `json:"profile_photo"`
	WhatsappNumber string `json:"whatsapp_number"`
	Address        string `json:"address"`
	Role           struct {
		ID       int    `json:"id"`
		RoleName string `json:"role_name"`
	} `json:"role"`
	Status    string    `json:"status"`
	SectorID  int       `json:"sector_id,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type UploadResponse struct {
	Path string `json:"path"`
	URL  string `json:"url"`
}
