package shared

import "github.com/golang-jwt/jwt"

type JWTParser interface {
	ParseWithClaims(tokenString string, claims jwt.Claims, keyFunc jwt.Keyfunc) (*jwt.Token, error)
}
