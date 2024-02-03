package domain

import "github.com/golangid/candi/candishared"

// FilterUser model
type FilterUser struct {
	candishared.Filter
	ID       *int     `json:"id"`
	Email    string   `json:"email"`
	Role     string   `json:"role"`
	RoleIDs  []int    `json:"-"`
	Preloads []string `json:"-"`
}

type FilterSector struct {
	candishared.Filter
	ID *int `json:"id"`
}
