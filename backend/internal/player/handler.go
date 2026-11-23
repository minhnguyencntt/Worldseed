package player

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"time"
)

// Handler issues player session cookies.
type Handler struct {
	Secret     []byte
	CookieName string
	TTL        time.Duration
	Secure     bool
	Now        func() time.Time
}

// NewHandler returns a Handler that uses the wall clock.
func NewHandler(secret []byte, cookieName string, ttl time.Duration, secure bool) *Handler {
	return &Handler{
		Secret:     secret,
		CookieName: cookieName,
		TTL:        ttl,
		Secure:     secure,
		Now:        time.Now,
	}
}

// CreateSession starts an anonymous player session. It sets a signed, HttpOnly
// session cookie and responds 201 with the new player id.
func (h *Handler) CreateSession(w http.ResponseWriter, _ *http.Request) {
	if len(h.Secret) == 0 {
		slog.Error("player: token secret is empty")
		http.Error(w, "server misconfigured", http.StatusInternalServerError)
		return
	}

	id, err := NewID()
	if err != nil {
		slog.Error("player: create session", "err", err)
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	now := time.Now()
	if h.Now != nil {
		now = h.Now()
	}

	http.SetCookie(w, &http.Cookie{
		Name:     h.CookieName,
		Value:    Sign(h.Secret, id, now),
		Path:     "/",
		MaxAge:   int(h.TTL.Seconds()),
		HttpOnly: true,
		Secure:   h.Secure,
		SameSite: http.SameSiteLaxMode,
	})
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(map[string]string{"id": id})
}

// Me reports the player id carried by the session cookie. It responds 200 with
// {"id": "..."} when the cookie verifies and is unexpired, and 401 when the
// cookie is missing, tampered, wrongly signed, expired or malformed.
func (h *Handler) Me(w http.ResponseWriter, r *http.Request) {
	if len(h.Secret) == 0 {
		slog.Error("player: token secret is empty")
		http.Error(w, "server misconfigured", http.StatusInternalServerError)
		return
	}

	cookie, err := r.Cookie(h.CookieName)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	now := time.Now()
	if h.Now != nil {
		now = h.Now()
	}

	id, err := Verify(h.Secret, cookie.Value, now, h.TTL)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(map[string]string{"id": id})
}
