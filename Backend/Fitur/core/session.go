package core

import (
	"crypto/rand"

	"github.com/gorilla/sessions"
)

const SessionName = "your-session-name"

var SessionStore *sessions.CookieStore

func InitSessionStore() {
	SessionStore = sessions.NewCookieStore(generateRandomKey())
}

// GenerateRandomKey generates a random secret key
func generateRandomKey() []byte {
	key := make([]byte, 32) // Change the size of the byte slice based on your needs
	_, err := rand.Read(key)
	if err != nil {
		panic(err) // Handle the error appropriately in a real-world scenario
	}
	return key
}
