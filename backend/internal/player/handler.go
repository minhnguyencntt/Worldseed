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
