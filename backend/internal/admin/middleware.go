// Package admin provides HTTP middleware that guards admin endpoints with a bearer token.
package admin

import (
	"crypto/sha256"
	"crypto/subtle"
	"net/http"
	"strings"
)

const bearerPrefix = "Bearer "

// Middleware returns middleware that only passes requests carrying the exact
// bearer token. An empty configured token rejects every request. Tokens are
// compared as SHA-256 digests in constant time.
func Middleware(token string) func(http.Handler) http.Handler {
	want := sha256.Sum256([]byte(token))
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if token == "" {
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}
			header := r.Header.Get("Authorization")
			if !strings.HasPrefix(header, bearerPrefix) {
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}
			got := sha256.Sum256([]byte(strings.TrimPrefix(header, bearerPrefix)))
			if subtle.ConstantTimeCompare(got[:], want[:]) != 1 {
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
