package domain

import (
	shareddomain "service-auth/pkg/shared/domain"
)

// RequestUser model
type RequestUser struct {
	ID    int    `json:"id"`
	Field string `json:"field"`
}

// Deserialize to db model
func (r *RequestUser) Deserialize() (res shareddomain.User) {
	// res.Field = r.Field
	return
}

type RegisterPayload struct {
	Fullname        string `json:"fullname"`
	WhatsappNumber  string `json:"whatsapp_number"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
}

type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UpdateUserPayload struct {
	UserID         int    `json:"user_id,omitempty"`
	Fullname       string `json:"fullname"`
	ProfilePhoto   string `json:"profile_photo"`
	WhatsappNumber string `json:"whatsapp_number"`
	Address        string `json:"address"`
	SectorID       int    `json:"sector_id,omitempty"`
	Status         string `json:"status,omitempty"`
}

type AddAdminPayload struct {
	Fullname        string `json:"fullname"`
	WhatsappNumber  string `json:"whatsapp_number"`
	Email           string `json:"email"`
	ProfilePhoto    string `json:"profile_photo"`
	RoleID          int    `json:"role_id"`
	SectorID        int    `json:"sector_id"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
}

type UploadRequest struct {
	Filename    string `json:"filename"`
	FileSize    int64  `json:"fileSize"`
	ContentType string `json:"contentType"`
	UserID      int    `json:"-"`
}

type VerifyEmailRequest struct {
	Token string `json:"token"`
}

type ForgotPasswordRequet struct {
	Email string `json:"email"`
}

type UpdatePasswordRequest struct {
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
	Token           string `json:"token"`
}

type ResendVerifyEmailRequet struct {
	Email string `json:"email"`
}
