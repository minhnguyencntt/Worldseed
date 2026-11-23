package admin

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/worldseed/storyforge/backend/internal/contribution"
	"github.com/worldseed/storyforge/backend/internal/world"
)

// Errors a RoundService returns so that RoundHandler can map them to HTTP
// statuses. Services wrap these sentinels with fmt.Errorf("...: %w", err).
var (
	// ErrNotFound reports an unknown world or round. world.ErrNotFound also maps to 404.
	ErrNotFound = errors.New("admin: not found")
	// ErrConflict reports a round transition that the current round state does not allow.
	ErrConflict = errors.New("admin: conflict")
	// ErrInvalid reports a request value the round service rejects.
	ErrInvalid = errors.New("admin: invalid")
)

// CreateRoundInput is the validated input for creating a round.
// Zero Duration and empty BaseRelease are left to the service defaults.
type CreateRoundInput struct {
	WorldID     string
	StartsAt    time.Time
	Duration    time.Duration
	BaseRelease string
}

// RoundService manages the round lifecycle for admin requests.
type RoundService interface {
	Create(ctx context.Context, in CreateRoundInput) (world.Round, error)
	Open(ctx context.Context, worldID, roundID string) (world.Round, error)
	Close(ctx context.Context, worldID, roundID string) (world.Round, error)
	Get(ctx context.Context, worldID, roundID string) (world.Round, error)
}

// ContributionLister lists the contributions submitted to one round.
type ContributionLister interface {
	ListByRound(ctx context.Context, worldID, roundID string) ([]contribution.Contribution, error)
}

// RoundHandler serves the admin round endpoints. Round id comes from the id URL
// parameter and world id from the world query parameter, except Create which
// reads world_id from the JSON body.
type RoundHandler struct {
	Rounds RoundService
	Lister ContributionLister
}

type createRoundRequest struct {
	WorldID     string    `json:"world_id"`
	StartsAt    time.Time `json:"starts_at"`
	Duration    string    `json:"duration"`
	BaseRelease string    `json:"base_release"`
}

type contributionJSON struct {
	ID         string    `json:"id"`
	WorldID    string    `json:"world_id"`
	RoundID    string    `json:"round_id"`
	PlayerID   string    `json:"player_id"`
	Prompt     string    `json:"prompt"`
	PromptHash string    `json:"prompt_hash"`
	CreatedAt  time.Time `json:"created_at"`
}

// Create responds 201 with the new round for the JSON body, or an error status.
func (h *RoundHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req createRoundRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	var dur time.Duration
	if req.Duration != "" {
		d, err := time.ParseDuration(req.Duration)
		if err != nil {
			http.Error(w, "invalid duration", http.StatusBadRequest)
			return
		}
		dur = d
	}
	rd, err := h.Rounds.Create(r.Context(), CreateRoundInput{
		WorldID:     req.WorldID,
		StartsAt:    req.StartsAt,
		Duration:    dur,
		BaseRelease: req.BaseRelease,
	})
	if err != nil {
		fail(w, "create round", err)
		return
	}
	writeJSON(w, http.StatusCreated, rd)
}

// Open responds 200 with the opened round, or an error status.
func (h *RoundHandler) Open(w http.ResponseWriter, r *http.Request) {
	rd, err := h.Rounds.Open(r.Context(), r.URL.Query().Get("world"), chi.URLParam(r, "id"))
	if err != nil {
		fail(w, "open round", err)
		return
	}
	writeJSON(w, http.StatusOK, rd)
}

// Close responds 200 with the closed round, or an error status.
func (h *RoundHandler) Close(w http.ResponseWriter, r *http.Request) {
	rd, err := h.Rounds.Close(r.Context(), r.URL.Query().Get("world"), chi.URLParam(r, "id"))
	if err != nil {
		fail(w, "close round", err)
		return
	}
	writeJSON(w, http.StatusOK, rd)
}

// Get responds 200 with the round, or an error status.
func (h *RoundHandler) Get(w http.ResponseWriter, r *http.Request) {
	rd, err := h.Rounds.Get(r.Context(), r.URL.Query().Get("world"), chi.URLParam(r, "id"))
	if err != nil {
		fail(w, "get round", err)
		return
	}
	writeJSON(w, http.StatusOK, rd)
}

// Contributions responds 200 with the JSON array of contributions for the round,
// or an error status.
func (h *RoundHandler) Contributions(w http.ResponseWriter, r *http.Request) {
	list, err := h.Lister.ListByRound(r.Context(), r.URL.Query().Get("world"), chi.URLParam(r, "id"))
	if err != nil {
		fail(w, "list contributions", err)
		return
	}
	out := make([]contributionJSON, 0, len(list))
	for _, c := range list {
		out = append(out, contributionJSON{
			ID:         c.ID,
			WorldID:    c.WorldID,
			RoundID:    c.RoundID,
			PlayerID:   c.PlayerID,
			Prompt:     c.Prompt,
			PromptHash: c.PromptHash,
			CreatedAt:  c.CreatedAt,
		})
	}
	writeJSON(w, http.StatusOK, out)
}

// statusFor maps a service error to its HTTP status: 404 for not found, 409 for
// conflict, 400 for invalid input and 500 for anything else.
func statusFor(err error) int {
	switch {
	case errors.Is(err, ErrNotFound), errors.Is(err, world.ErrNotFound):
		return http.StatusNotFound
	case errors.Is(err, ErrConflict):
		return http.StatusConflict
	case errors.Is(err, ErrInvalid):
		return http.StatusBadRequest
	default:
		return http.StatusInternalServerError
	}
}

// fail writes the status for err. Internal errors are logged and returned as a
// generic message so no backend detail reaches the client.
func fail(w http.ResponseWriter, op string, err error) {
	status := statusFor(err)
	if status == http.StatusInternalServerError {
		slog.Error("admin: "+op, "err", err)
		http.Error(w, "internal error", status)
		return
	}
	http.Error(w, http.StatusText(status), status)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
