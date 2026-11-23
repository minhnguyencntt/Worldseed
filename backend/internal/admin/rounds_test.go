package admin

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/worldseed/storyforge/backend/internal/contribution"
	"github.com/worldseed/storyforge/backend/internal/world"
)

// fakeRounds is a RoundService test double. Each method returns the configured
// round and error, and records the arguments of the last call.
type fakeRounds struct {
	round world.Round
	err   error

	createIn  CreateRoundInput
	lastWorld string
	lastID    string
}

func (f *fakeRounds) Create(_ context.Context, in CreateRoundInput) (world.Round, error) {
	f.createIn = in
	return f.round, f.err
}

func (f *fakeRounds) Open(_ context.Context, worldID, roundID string) (world.Round, error) {
	f.lastWorld, f.lastID = worldID, roundID
	return f.round, f.err
}

func (f *fakeRounds) Close(_ context.Context, worldID, roundID string) (world.Round, error) {
	f.lastWorld, f.lastID = worldID, roundID
	return f.round, f.err
}

func (f *fakeRounds) Get(_ context.Context, worldID, roundID string) (world.Round, error) {
	f.lastWorld, f.lastID = worldID, roundID
	return f.round, f.err
}

// fakeLister is a ContributionLister test double that returns a fixed list.
type fakeLister struct {
	list []contribution.Contribution
	err  error
}

func (f *fakeLister) ListByRound(_ context.Context, _, _ string) ([]contribution.Contribution, error) {
	return f.list, f.err
}

// newRoundRouter mounts RoundHandler on a chi router with the same paths the
// admin routes use, without the admin token middleware.
func newRoundRouter(h *RoundHandler) http.Handler {
	r := chi.NewRouter()
	r.Post("/rounds", h.Create)
	r.Post("/rounds/{id}/open", h.Open)
	r.Post("/rounds/{id}/close", h.Close)
	r.Get("/rounds/{id}", h.Get)
	r.Get("/rounds/{id}/contributions", h.Contributions)
	return r
}

// Given a RoundHandler whose RoundService and ContributionLister are fakes,
// when the round endpoints are called, then each maps the service result or
// sentinel error to the expected HTTP status and JSON body.
func TestRoundHandler_Statuses(t *testing.T) {
	startsAt := time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC)
	scheduled := world.Round{ID: "ROUND-0000001", Number: 1, Status: "SCHEDULED", StartsAt: startsAt}

	t.Run("POST /rounds with world_id creates a round and responds 201 with status SCHEDULED", func(t *testing.T) {
		svc := &fakeRounds{round: scheduled}
		h := newRoundRouter(&RoundHandler{Rounds: svc, Lister: &fakeLister{}})

		rec := httptest.NewRecorder()
		req := httptest.NewRequest(http.MethodPost, "/rounds", strings.NewReader(`{"world_id":"w"}`))
		h.ServeHTTP(rec, req)

		if rec.Code != http.StatusCreated {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusCreated, rec.Body.String())
		}
		if ct := rec.Header().Get("Content-Type"); ct != "application/json" {
			t.Errorf("Content-Type = %q, want application/json", ct)
		}
		var got world.Round
		if err := json.Unmarshal(rec.Body.Bytes(), &got); err != nil {
			t.Fatalf("body is not a round JSON: %v (body=%q)", err, rec.Body.String())
		}
		if got.Status != "SCHEDULED" {
			t.Errorf("round status = %q, want SCHEDULED", got.Status)
		}
		if svc.createIn.WorldID != "w" {
			t.Errorf("service WorldID = %q, want %q", svc.createIn.WorldID, "w")
		}
	})

	t.Run("POST /rounds/{id}/close maps ErrConflict to 409", func(t *testing.T) {
		svc := &fakeRounds{err: fmt.Errorf("close: %w", ErrConflict)}
		h := newRoundRouter(&RoundHandler{Rounds: svc, Lister: &fakeLister{}})

		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodPost, "/rounds/ROUND-0000001/close?world=w", nil))

		if rec.Code != http.StatusConflict {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusConflict, rec.Body.String())
		}
		if svc.lastID != "ROUND-0000001" || svc.lastWorld != "w" {
			t.Errorf("service got world=%q id=%q, want w ROUND-0000001", svc.lastWorld, svc.lastID)
		}
	})

	t.Run("GET /rounds/{id} maps ErrNotFound to 404", func(t *testing.T) {
		svc := &fakeRounds{err: fmt.Errorf("get: %w", ErrNotFound)}
		h := newRoundRouter(&RoundHandler{Rounds: svc, Lister: &fakeLister{}})

		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/rounds/ROUND-0000009?world=w", nil))

		if rec.Code != http.StatusNotFound {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusNotFound, rec.Body.String())
		}
	})

	t.Run("GET /rounds/{id} maps world.ErrNotFound to 404", func(t *testing.T) {
		svc := &fakeRounds{err: fmt.Errorf("get: %w", world.ErrNotFound)}
		h := newRoundRouter(&RoundHandler{Rounds: svc, Lister: &fakeLister{}})

		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/rounds/ROUND-0000009?world=unknown", nil))

		if rec.Code != http.StatusNotFound {
			t.Fatalf("status = %d, want %d", rec.Code, http.StatusNotFound)
		}
	})

	t.Run("POST /rounds with malformed JSON responds 400", func(t *testing.T) {
		svc := &fakeRounds{round: scheduled}
		h := newRoundRouter(&RoundHandler{Rounds: svc, Lister: &fakeLister{}})

		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodPost, "/rounds", strings.NewReader(`{"world_id":`)))

		if rec.Code != http.StatusBadRequest {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusBadRequest, rec.Body.String())
		}
	})

	t.Run("POST /rounds with an unparseable duration responds 400", func(t *testing.T) {
		svc := &fakeRounds{round: scheduled}
		h := newRoundRouter(&RoundHandler{Rounds: svc, Lister: &fakeLister{}})

		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodPost, "/rounds", bytes.NewBufferString(`{"world_id":"w","duration":"soon"}`)))

		if rec.Code != http.StatusBadRequest {
			t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
		}
	})

	t.Run("POST /rounds/{id}/open maps ErrInvalid to 400 and an unknown error to a generic 500", func(t *testing.T) {
		h := newRoundRouter(&RoundHandler{Rounds: &fakeRounds{err: ErrInvalid}, Lister: &fakeLister{}})
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodPost, "/rounds/ROUND-0000001/open?world=w", nil))
		if rec.Code != http.StatusBadRequest {
			t.Fatalf("invalid: status = %d, want %d", rec.Code, http.StatusBadRequest)
		}

		h = newRoundRouter(&RoundHandler{Rounds: &fakeRounds{err: errors.New("disk on fire")}, Lister: &fakeLister{}})
		rec = httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodPost, "/rounds/ROUND-0000001/open?world=w", nil))
		if rec.Code != http.StatusInternalServerError {
			t.Fatalf("unknown: status = %d, want %d", rec.Code, http.StatusInternalServerError)
		}
		if strings.Contains(rec.Body.String(), "disk on fire") {
			t.Errorf("body leaks internal error: %q", rec.Body.String())
		}
	})

	t.Run("GET /rounds/{id}/contributions responds 200 with the fake list as JSON", func(t *testing.T) {
		created := time.Date(2026, 1, 1, 12, 0, 0, 0, time.UTC)
		lister := &fakeLister{list: []contribution.Contribution{
			{ID: "C-1", WorldID: "w", RoundID: "ROUND-0000001", PlayerID: "p1", Prompt: "a prompt", PromptHash: "h1", CreatedAt: created},
		}}
		h := newRoundRouter(&RoundHandler{Rounds: &fakeRounds{}, Lister: lister})

		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/rounds/ROUND-0000001/contributions?world=w", nil))

		if rec.Code != http.StatusOK {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusOK, rec.Body.String())
		}
		var got []contributionJSON
		if err := json.Unmarshal(rec.Body.Bytes(), &got); err != nil {
			t.Fatalf("body is not a JSON array: %v (body=%q)", err, rec.Body.String())
		}
		if len(got) != 1 || got[0].ID != "C-1" || got[0].PromptHash != "h1" || got[0].RoundID != "ROUND-0000001" {
			t.Fatalf("contributions = %+v, want one item C-1 with hash h1 in ROUND-0000001", got)
		}
	})
}

// Given a RoundHandler whose RoundService is a fake, when a round is fetched or
// opened, then a found round responds 200 with its JSON and a not-found error
// responds 404 on both routes.
func TestRoundHandler_GetAndOpenStatuses(t *testing.T) {
	t.Run("GET /rounds/{id} responds 200 with the round JSON when found", func(t *testing.T) {
		svc := &fakeRounds{round: world.Round{ID: "ROUND-0000001"}}
		h := newRoundRouter(&RoundHandler{Rounds: svc, Lister: &fakeLister{}})

		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/rounds/ROUND-0000001?world=w", nil))

		if rec.Code != http.StatusOK {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusOK, rec.Body.String())
		}
		var got world.Round
		if err := json.Unmarshal(rec.Body.Bytes(), &got); err != nil {
			t.Fatalf("body is not a round JSON: %v (body=%q)", err, rec.Body.String())
		}
		if got.ID != "ROUND-0000001" {
			t.Errorf("round ID = %q, want ROUND-0000001", got.ID)
		}
	})

	t.Run("GET /rounds/{id} maps ErrNotFound to 404", func(t *testing.T) {
		svc := &fakeRounds{err: fmt.Errorf("get: %w", ErrNotFound)}
		h := newRoundRouter(&RoundHandler{Rounds: svc, Lister: &fakeLister{}})

		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/rounds/ROUND-0000001?world=w", nil))

		if rec.Code != http.StatusNotFound {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusNotFound, rec.Body.String())
		}
	})

	t.Run("POST /rounds/{id}/open maps ErrNotFound to 404", func(t *testing.T) {
		svc := &fakeRounds{err: fmt.Errorf("open: %w", ErrNotFound)}
		h := newRoundRouter(&RoundHandler{Rounds: svc, Lister: &fakeLister{}})

		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodPost, "/rounds/ROUND-0000001/open?world=w", nil))

		if rec.Code != http.StatusNotFound {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusNotFound, rec.Body.String())
		}
	})
}
