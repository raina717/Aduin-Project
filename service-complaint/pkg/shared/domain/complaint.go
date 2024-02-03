package domain

import (
	"time"
)

// Complaint model
type Complaint struct {
	ID           int       `gorm:"column:id;primary_key" json:"id"`
	ComplaintNum string    `gorm:"column:complain_no;type:varchar(255)" json:"complain_no"`
	Title        string    `gorm:"column:title;type:varchar(255)" json:"title"`
	Description  string    `gorm:"column:description;type:varchar(255)" json:"description"`
	Location     string    `gorm:"column:location;type:varchar(255)" json:"location"`
	Date         time.Time `gorm:"column:date" json:"date"`
	IsAnonymous  bool      `gorm:"column:is_anonymous;type:bool" json:"is_anonymous"`
	CategoryID   int       `gorm:"column:category_id" json:"category_id"`
	Category     Category  `gorm:"foreignkey:CategoryID;references:ID"`
	UserID       int       `gorm:"column:user_id" json:"user_id"`
	User         User      `gorm:"foreignkey:UserID;references:ID"`
	Status       string    `gorm:"column:status;type:varchar(255)" json:"status"`
	ShareCount   int       `gorm:"column:share_count" json:"share_count"`
	LikeCount    int       `gorm:"column:like_count" json:"like_count"`
	CreatedAt    time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time `gorm:"column:updated_at" json:"updated_at"`

	Evidences []Evidence `gorm:"foreignkey:ComplaintID;references:ID"`
	Responses []Response `gorm:"foreignkey:ComplaintID;references:ID"`
	Comments  []Comment  `gorm:"foreignkey:ComplaintID;references:ID"`
	Likes     []Like     `gorm:"foreignkey:ComplaintID;references:ID"`
}

// TableName return table name of Complaint model
func (Complaint) TableName() string {
	return "complaints"
}

type Evidence struct {
	ID          int       `gorm:"column:id;primary_key" json:"id"`
	ComplaintID int       `gorm:"column:complaint_id" json:"complaint_id"`
	Type        string    `gorm:"column:evidence_type;type:varchar(255)" json:"evidence_type"`
	URL         string    `gorm:"column:url;type:text" json:"url"`
	CreatedAt   time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
}

// TableName return table name of Complaint model
func (Evidence) TableName() string {
	return "complaint_evidence"
}

type Response struct {
	ID          int       `gorm:"column:id;primary_key" json:"id"`
	ComplaintID int       `gorm:"column:complaint_id" json:"complaint_id"`
	UserID      int       `gorm:"column:user_id" json:"user_id"`
	User        User      `gorm:"foreignkey:UserID;references:ID"`
	Description string    `gorm:"column:description;type:text" json:"description"`
	CreatedAt   time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
}

// TableName return table name of Complaint model
func (Response) TableName() string {
	return "complaint_response"
}

type Comment struct {
	ID          int       `gorm:"column:id;primary_key" json:"id"`
	ComplaintID int       `gorm:"column:complaint_id" json:"complaint_id"`
	UserID      int       `gorm:"column:user_id" json:"user_id"`
	User        User      `gorm:"foreignkey:UserID;references:ID"`
	Description string    `gorm:"column:comment;type:text" json:"comment"`
	CreatedAt   time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
}

// TableName return table name of Complaint model
func (Comment) TableName() string {
	return "complaint_comment"
}

type Like struct {
	ID          int       `gorm:"column:id;primary_key" json:"id"`
	ComplaintID int       `gorm:"column:complaint_id" json:"complaint_id"`
	UserID      int       `gorm:"column:user_id" json:"user_id"`
	User        User      `gorm:"foreignkey:UserID;references:ID"`
	CreatedAt   time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
}

// TableName return table name of Complaint model
func (Like) TableName() string {
	return "complaint_like"
}

type Category struct {
	ID        int       `gorm:"column:id;primary_key" json:"id"`
	Name      string    `gorm:"column:name;type:varchar(255)" json:"name"`
	Sector    string    `gorm:"column:sector;type:varchar(255)" json:"sector"`
	SectorID  int       `gorm:"column:sector_id;type:integer" json:"sector_id"`
	CreatedAt time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at" json:"updated_at"`
}

// TableName return table name of Complaint model
func (Category) TableName() string {
	return "complaint_category"
}
