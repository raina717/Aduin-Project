package domain

import "github.com/golangid/candi/candishared"

// FilterComplaint model
type FilterComplaint struct {
	candishared.Filter
	ID              *int     `json:"id"`
	ComplaintNum    string   `json:"-"`
	StartDate       string   `json:"startDate"`
	EndDate         string   `json:"endDate"`
	UserID          int      `json:"-"`
	SubmittedBy     int      `json:"submitted_by"`
	SectorID        int      `json:"sector_id"`
	IsViral         bool     `json:"is_viral"`
	Status          string   `json:"status"`
	CategoryID      string   `json:"category"`
	ShowCurrentUser bool     `json:"show_current_user"`
	Preloads        []string `json:"-"`
}

type FilterEvidence struct {
	candishared.Filter
	ID        *int     `json:"id"`
	StartDate string   `json:"startDate"`
	EndDate   string   `json:"endDate"`
	Preloads  []string `json:"-"`
}

type FilterResponse struct {
	candishared.Filter
	ID        *int     `json:"id"`
	StartDate string   `json:"startDate"`
	EndDate   string   `json:"endDate"`
	Preloads  []string `json:"-"`
}

type FilterComment struct {
	candishared.Filter
	ID        *int     `json:"id"`
	StartDate string   `json:"startDate"`
	EndDate   string   `json:"endDate"`
	Preloads  []string `json:"-"`
}

type FilterLike struct {
	candishared.Filter
	ID          *int   `json:"id"`
	StartDate   string `json:"startDate"`
	EndDate     string `json:"endDate"`
	UserID      int
	ComplaintID int
	Preloads    []string `json:"-"`
}

type FilterCategory struct {
	candishared.Filter
	ID          *int   `json:"id"`
	StartDate   string `json:"startDate"`
	EndDate     string `json:"endDate"`
	UserID      int
	ComplaintID int
	Preloads    []string `json:"-"`
}
