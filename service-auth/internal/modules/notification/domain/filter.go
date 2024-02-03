package domain

import "github.com/golangid/candi/candishared"

// FilterNotification model
type FilterNotification struct {
	candishared.Filter
	ID        *int     `json:"id"`
	IDs       []int    `json:"-"`
	UserID    int      `json:"-"`
	IsRead    *bool    `json:"is_read"`
	StartDate string   `json:"startDate"`
	EndDate   string   `json:"endDate"`
	Preloads  []string `json:"-"`
}
