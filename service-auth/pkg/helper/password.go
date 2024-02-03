package helper

import (
	"bytes"
	"crypto/rand"
	"encoding/base64"
	"hash"

	// "time"

	"golang.org/x/crypto/pbkdf2"
)

// PasswordHasher abstraction
type PasswordHasher interface {
	HashPassword(password string) (cipherText, saltString string)
	VerifyPassword(password, cipherText, salt string) bool
}

// passHasherPbkdf2 model
type passHasherPbkdf2 struct {
	Diggest    func() hash.Hash
	SaltSize   int
	KeyLen     int
	Iterations int
}

// NewPasswordHasher constructor
func NewPasswordHasher(diggest func() hash.Hash, saltSize int, keyLen int, iter int) PasswordHasher {
	return &passHasherPbkdf2{
		Diggest:    diggest,
		SaltSize:   saltSize,
		KeyLen:     keyLen,
		Iterations: iter,
	}
}

func (p *passHasherPbkdf2) genSalt() string {
	saltBytes := make([]byte, p.SaltSize)
	// rand.Seed(time.Now().UnixNano())
	// change salt random to crypto/rand
	rand.Read(saltBytes)
	return base64.StdEncoding.EncodeToString(saltBytes)
}

// HashPassword method
func (p *passHasherPbkdf2) HashPassword(password string) (cipherText, saltString string) {
	saltString = p.genSalt()
	salt := bytes.NewBufferString(saltString).Bytes()
	df := pbkdf2.Key([]byte(password), salt, p.Iterations, p.KeyLen, p.Diggest)
	cipherText = base64.StdEncoding.EncodeToString(df)
	return
}

// VerifyPassword method
func (p *passHasherPbkdf2) VerifyPassword(password, cipherText, salt string) bool {
	saltBytes := bytes.NewBufferString(salt).Bytes()
	df := pbkdf2.Key([]byte(password), saltBytes, p.Iterations, p.KeyLen, p.Diggest)
	newCipherText := base64.StdEncoding.EncodeToString(df)
	return newCipherText == cipherText
}
