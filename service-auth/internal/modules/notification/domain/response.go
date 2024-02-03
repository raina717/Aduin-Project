package domain

import (
	shareddomain "service-auth/pkg/shared/domain"
	"time"
)

// ResponseNotification model
type ResponseNotification struct {
	ID        int    `json:"id"`
	Field     string `json:"field"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

// Serialize from db model
func (r *ResponseNotification) Serialize(source *shareddomain.Notification) {
	r.ID = source.ID
	// r.Field = source.Field
	r.CreatedAt = source.CreatedAt.Format(time.RFC3339)
	r.UpdatedAt = source.UpdatedAt.Format(time.RFC3339)
}
