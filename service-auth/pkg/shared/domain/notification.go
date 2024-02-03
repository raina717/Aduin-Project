package domain

import (
	"time"
)

// Notification model
type Notification struct {
	ID          int       `gorm:"column:id;primary_key" json:"id"`
	UserID      int       `gorm:"column:user_id" json:"user_id"`
	Title       string    `gorm:"column:title;type:varchar(255)" json:"title"`
	Description string    `gorm:"column:description;type:text" json:"description"`
	Icon        string    `gorm:"column:icon;type:text" json:"icon"`
	IsRead      bool      `gorm:"column:is_read;" json:"is_read"`
	CreatedAt   time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
}

// TableName return table name of Notification model
func (Notification) TableName() string {
	return "notifications"
}
