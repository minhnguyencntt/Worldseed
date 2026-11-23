// Package player issues and verifies signed anonymous player session tokens.
package player

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"
)

// ErrInvalidToken is returned by Verify for malformed, tampered or expired tokens.
var ErrInvalidToken = errors.New("player: invalid token")

// NewID returns a random 128-bit player id encoded as lowercase hex.
func NewID() (string, error) {
	var b [16]byte
	if _, err := rand.Read(b[:]); err != nil {
		return "", fmt.Errorf("player: generate id: %w", err)
	}
	return hex.EncodeToString(b[:]), nil
}

// Sign returns a token of the form base64url(id "." unix) "." base64url(HMAC-SHA256(secret, first part)).
func Sign(secret []byte, id string, issued time.Time) string {
	payload := base64.RawURLEncoding.EncodeToString([]byte(id + "." + strconv.FormatInt(issued.Unix(), 10)))
	return payload + "." + base64.RawURLEncoding.EncodeToString(mac(secret, payload))
}

// Verify checks the token signature and age, and returns the player id it carries.
// It returns ErrInvalidToken when the token is malformed, its signature does not
// match, or it was issued more than ttl before now.
func Verify(secret []byte, token string, now time.Time, ttl time.Duration) (string, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 2 {
		return "", ErrInvalidToken
	}

	got, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil || !hmac.Equal(got, mac(secret, parts[0])) {
		return "", ErrInvalidToken
	}

	raw, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return "", ErrInvalidToken
	}
	fields := strings.Split(string(raw), ".")
	if len(fields) != 2 {
		return "", ErrInvalidToken
	}

	unix, err := strconv.ParseInt(fields[1], 10, 64)
	if err != nil {
		return "", ErrInvalidToken
	}
	if now.Sub(time.Unix(unix, 0)) > ttl {
		return "", ErrInvalidToken
	}
	return fields[0], nil
}

func mac(secret []byte, data string) []byte {
	h := hmac.New(sha256.New, secret)
	h.Write([]byte(data))
	return h.Sum(nil)
}
