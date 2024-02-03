package domain

import "github.com/golangid/candi/candishared"

// FilterUser model
type FilterUser struct {
	candishared.Filter
	ID        *int     `json:"id"`
	SectorID  *int     `json:"sector_id"`
	RoleID    *int     `json:"role_id"`
	StartDate string   `json:"startDate"`
	EndDate   string   `json:"endDate"`
	Preloads  []string `json:"-"`
	UseOr     bool     `json:"-"`
}
