package usecase

import (
	"context"
	"errors"

	"github.com/golang-jwt/jwt"
	"github.com/golangid/candi/candishared"
	"github.com/golangid/candi/tracer"
)

// ValidateToken implements interfaces.TokenValidator.
func (uc userUsecaseImpl) ValidateToken(ctx context.Context, token string) (claim *candishared.TokenClaim, err error) {
	trace, ctx := tracer.StartTraceWithContext(ctx, "AuthUsecase:ValidateToken")
	defer trace.Finish()

	tokenDecrypt, err := uc.aesCrypto.Decrypt(ctx, token)
	if err != nil {
		return claim, err
	}

	tokenParse, err := uc.jwtParser.ParseWithClaims(tokenDecrypt, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return uc.rsaPublicKey, nil
	})

	switch ve := err.(type) {
	case *jwt.ValidationError:
		if ve.Errors == jwt.ValidationErrorExpired {
			err = errors.New("Token is expired")
		} else {
			err = errors.New("Invalid token format")
		}
	}

	if err != nil {
		return
	}

	if !tokenParse.Valid {
		return claim, errors.New("Invalid token format")
	}

	stdClaim, _ := tokenParse.Claims.(*jwt.StandardClaims)
	claim = &candishared.TokenClaim{
		StandardClaims: *stdClaim,
	}

	return
}
