package shared

import (
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"time"

	"github.com/golangid/candi/tracer"
)

const (
	// TypeAESCrypto const
	TypeAESCrypto = "aes_crypto"
)

type (
	AESGcm interface {
		Encrypt(ctx context.Context, param *AESGcmParam) (result string, err error)
		Decrypt(ctx context.Context, encrypted string) (res string, err error)
	}

	// aesGCMImpl crypto model
	aesGCMImpl struct {
		aesGCM cipher.AEAD
		// nonceSession interfaces.Cache
	}

	// AESGcmParam model
	AESGcmParam struct {
		Plaintext string
		NonceAge  time.Duration
	}
)

// NewAESGcm constructor
func NewAESGcm(key string) AESGcm {

	if len(key) < 32 {
		panic(errors.New("key len should be 32 byte"))
	}

	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		panic(err)
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		panic(err)
	}

	return &aesGCMImpl{
		aesGCM: aesGCM,
	}
}

// Encrypt method
func (a *aesGCMImpl) Encrypt(ctx context.Context, param *AESGcmParam) (result string, err error) {
	trace := tracer.StartTrace(ctx, "AESCrypto:Encrypt")
	defer func() {
		if r := recover(); r != nil {
			err = errors.New("Invalid value")
		}
		trace.Finish(tracer.FinishWithError(err))
	}()

	trace.Log("plainText", param.Plaintext)

	plaintext := []byte(param.Plaintext)
	nonce := make([]byte, a.aesGCM.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return param.Plaintext, err
	}

	ciphertext := a.aesGCM.Seal(nil, nonce, plaintext, nil)
	result = fmt.Sprintf("%s%s", hex.EncodeToString(nonce), hex.EncodeToString(ciphertext))

	return result, nil
}

// Decrypt method
func (a *aesGCMImpl) Decrypt(ctx context.Context, encrypted string) (res string, err error) {
	trace := tracer.StartTrace(ctx, "AESCrypto:Decrypt")
	defer func() {
		if r := recover(); r != nil {
			err = errors.New("Invalid value")
		}
		trace.Finish(tracer.FinishWithError(err))
	}()

	trace.Log("encrypted", encrypted)

	nonce, _ := hex.DecodeString(encrypted[:(a.aesGCM.NonceSize() * 2)])
	enc, _ := hex.DecodeString(encrypted[(a.aesGCM.NonceSize() * 2):])

	plaintext, err := a.aesGCM.Open(nil, nonce, enc, nil)
	if err != nil {
		trace.SetError(err)
		return "", err
	}

	trace.Log("result", plaintext)
	return string(plaintext), nil
}
