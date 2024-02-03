package domain

import (
	"time"
)

// User model
type User struct {
	ID             int       `gorm:"column:id;primary_key" json:"id"`
	Fullname       string    `gorm:"column:fullname;type:varchar(255)" json:"fullname"`
	Email          string    `gorm:"column:email;type:varchar(255)" json:"email"`
	WhatsappNumber string    `gorm:"column:whatsapp_number;type:varchar(255)" json:"whatsapp_number"`
	Address        string    `gorm:"column:address;type:text" json:"address"`
	Status         string    `gorm:"column:status;type:varchar(255)" json:"status"`
	ProfilePhoto   string    `gorm:"column:photo_url;type:varchar(255)" json:"profile_photo"`
	Password       string    `gorm:"column:password;type:varchar(255)" json:"-"`
	Salt           string    `gorm:"column:salt;type:varchar(255)" json:"-"`
	RoleID         int       `gorm:"column:role_id;primary_key" json:"role_id"`
	Role           Role      `gorm:"foreignkey:RoleID;references:ID" json:"role"`
	SectorID       int       `gorm:"column:sector_id;type:integer" json:"sector_id"`
	CreatedAt      time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt      time.Time `gorm:"column:updated_at" json:"updated_at"`
}

// TableName return table name of User model
func (User) TableName() string {
	return "users"
}

// User model
type Role struct {
	ID       int    `gorm:"column:id;primary_key" json:"id"`
	RoleName string `gorm:"column:role_name;type:varchar(255)" json:"role_name"`
}

// TableName return table name of Role model
func (Role) TableName() string {
	return "roles"
}
