package contribution

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/worldseed/storyforge/backend/internal/player"
	"github.com/worldseed/storyforge/backend/internal/safepath"
)

// maxBodyBytes caps the size of a submitted JSON body.
const maxBodyBytes = 16 << 10

// Reader answers read-only lookups over stored contributions.
type Reader interface {
	Get(ctx context.Context, id string) (Contribution, error)
	ListByPlayer(ctx context.Context, roundID, playerID string) ([]Contribution, error)
}

// Handler serves the contribution endpoints. The author is the player id carried by the
// signed session cookie issued by player.Handler; a request without a valid cookie is 401.
type Handler struct {
	Service    *Service
	Reader     Reader
	Secret     []byte
	CookieName string
	TTL        time.Duration
	Now        func() time.Time
}

type createRequest struct {
	WorldID string `json:"world_id"`
	Prompt  string `json:"prompt"`
}

type contributionJSON struct {
	ID        string    `json:"id"`
	WorldID   string    `json:"world_id"`
	RoundID   string    `json:"round_id"`
	PlayerID  string    `json:"player_id"`
	Prompt    string    `json:"prompt"`
	CreatedAt time.Time `json:"created_at"`
}

// Create submits a prompt to the current round of the world named in the body.
// It responds 201 with the stored contribution; 400 for an invalid body, prompt or
// spam; 401 without a session; 404 for an unknown world; 409 when the round is not
// open, the player is at the limit, or the prompt is a duplicate; 429 when rate limited.
func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	playerID, ok := h.playerID(r)
	if !ok {
		writeError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	var req createRequest
	if err := json.NewDecoder(io.LimitReader(r.Body, maxBodyBytes)).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json body")
		return
	}

	c, err := h.Service.Submit(r.Context(), Input{WorldID: req.WorldID, PlayerID: playerID, Prompt: req.Prompt})
	if err != nil {
		status, msg := submitStatus(err)
		if status == http.StatusInternalServerError {
			slog.Error("contribution: submit", "err", err)
		}
		writeError(w, status, msg)
		return
	}
	writeJSON(w, http.StatusCreated, toJSON(c))
}

// Mine lists the caller's contributions for the round named by the round_id query
// parameter, oldest first. It responds 200, 400 when round_id is missing or unsafe,
// or 401 without a session.
func (h *Handler) Mine(w http.ResponseWriter, r *http.Request) {
	playerID, ok := h.playerID(r)
	if !ok {
		writeError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	roundID := r.URL.Query().Get("round_id")
	if err := safepath.Segment(roundID); err != nil {
		writeError(w, http.StatusBadRequest, "round_id is required")
		return
	}

	list, err := h.Reader.ListByPlayer(r.Context(), roundID, playerID)
	if err != nil {
		slog.Error("contribution: list mine", "err", err)
		writeError(w, http.StatusInternalServerError, "internal error")
		return
	}
	out := make([]contributionJSON, 0, len(list))
	for _, c := range list {
		out = append(out, toJSON(c))
	}
	writeJSON(w, http.StatusOK, out)
}

// Get returns one of the caller's contributions by the id URL parameter. It responds
// 200, 401 without a session, or 404 when the id is unknown, unsafe, or belongs to
// another player.
func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	playerID, ok := h.playerID(r)
	if !ok {
		writeError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	id := chi.URLParam(r, "id")
	if err := safepath.Segment(id); err != nil {
		writeError(w, http.StatusNotFound, "not found")
		return
	}

	c, err := h.Reader.Get(r.Context(), id)
	if errors.Is(err, ErrNotFound) || (err == nil && c.PlayerID != playerID) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	if err != nil {
		slog.Error("contribution: get", "err", err)
		writeError(w, http.StatusInternalServerError, "internal error")
		return
	}
	writeJSON(w, http.StatusOK, toJSON(c))
}

// playerID returns the player id from a valid, unexpired session cookie.
func (h *Handler) playerID(r *http.Request) (string, bool) {
	cookie, err := r.Cookie(h.CookieName)
	if err != nil {
		return "", false
	}
	now := time.Now()
	if h.Now != nil {
		now = h.Now()
	}
	id, err := player.Verify(h.Secret, cookie.Value, now, h.TTL)
	if err != nil {
		return "", false
	}
	return id, true
}

// submitStatus maps a Service error to an HTTP status and a client-safe message.
func submitStatus(err error) (int, string) {
	switch {
	case errors.Is(err, ErrPromptLength), errors.Is(err, ErrSpam):
		return http.StatusBadRequest, err.Error()
	case errors.Is(err, ErrWorldNotFound):
		return http.StatusNotFound, "world not found"
	case errors.Is(err, ErrRoundNotOpen), errors.Is(err, ErrLimitReached), errors.Is(err, ErrDuplicate):
		return http.StatusConflict, err.Error()
	case errors.Is(err, ErrRateLimited):
		return http.StatusTooManyRequests, err.Error()
	default:
		return http.StatusInternalServerError, "internal error"
	}
}

func toJSON(c Contribution) contributionJSON {
	return contributionJSON{
		ID:        c.ID,
		WorldID:   c.WorldID,
		RoundID:   c.RoundID,
		PlayerID:  c.PlayerID,
		Prompt:    c.Prompt,
		CreatedAt: c.CreatedAt,
	}
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
	http.Error(w, msg, status)
}
