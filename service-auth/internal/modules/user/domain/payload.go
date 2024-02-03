package domain

import "time"

type RequestGenerateToken struct {
	AdditionalAge time.Duration
	Subject       string
}

type ResponseGenerateToken struct {
	Token    string        `json:"token"`
	TokenAge time.Duration `json:"-"`
	// RefreshToken    string        `json:"refreshToken"`
	// RefreshTokenAge time.Duration `json:"-"`
}
