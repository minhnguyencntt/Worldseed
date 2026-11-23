package contribution

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/worldseed/storyforge/backend/internal/player"
)

const (
	testSecret     = "handler-test-secret"
	testCookieName = "sf_session"
	testTTL        = time.Hour
)

// fakeReader answers Reader lookups from an in-memory list. ListByPlayer filters by
// player id, as the real Repository does.
type fakeReader struct {
	items []Contribution
}

func (f *fakeReader) Get(_ context.Context, id string) (Contribution, error) {
	for _, c := range f.items {
		if c.ID == id {
			return c, nil
		}
	}
	return Contribution{}, ErrNotFound
}

func (f *fakeReader) ListByPlayer(_ context.Context, roundID, playerID string) ([]Contribution, error) {
	var out []Contribution
	for _, c := range f.items {
		if c.RoundID == roundID && c.PlayerID == playerID {
			out = append(out, c)
		}
	}
	return out, nil
}

// newTestHandler builds a Handler whose Service uses fakes and the fixed clock.
func newTestHandler(status string, store *fakeStore, limits Limits) *Handler {
	clock := &fakeClock{now: fixedNow}
	svc := newTestService(status, store, clock)
	if limits.RateMax > 0 {
		svc.Limits = limits
	}
	return &Handler{
		Service:    svc,
		Reader:     &fakeReader{},
		Secret:     []byte(testSecret),
		CookieName: testCookieName,
		TTL:        testTTL,
		Now:        func() time.Time { return fixedNow },
	}
}

// sessionCookie returns a valid session cookie for playerID issued at fixedNow.
func sessionCookie(playerID string) *http.Cookie {
	return &http.Cookie{Name: testCookieName, Value: player.Sign([]byte(testSecret), playerID, fixedNow)}
}

// newCreateReq builds a POST /api/v1/contributions request with the given body and cookie.
func newCreateReq(body string, cookie *http.Cookie) *http.Request {
	req := httptest.NewRequest(http.MethodPost, "/api/v1/contributions", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	if cookie != nil {
		req.AddCookie(cookie)
	}
	return req
}

// Given a handler whose service fails with each sentinel error,
// when POST /api/v1/contributions is called, then each error maps to its HTTP status,
// a missing session is 401, and a valid submission is 201 with the stored contribution.
func TestCreate_StatusMapping(t *testing.T) {
	validBody := `{"world_id":"` + testWorld + `","prompt":"a fine prompt"}`

	t.Run("missing cookie is unauthorized", func(t *testing.T) {
		h := newTestHandler("OPEN", &fakeStore{}, Limits{})
		rec := httptest.NewRecorder()
		h.Create(rec, newCreateReq(validBody, nil))
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("status = %d, want %d", rec.Code, http.StatusUnauthorized)
		}
	})

	t.Run("invalid cookie is unauthorized", func(t *testing.T) {
		h := newTestHandler("OPEN", &fakeStore{}, Limits{})
		rec := httptest.NewRecorder()
		bad := &http.Cookie{Name: testCookieName, Value: "not-a-token"}
		h.Create(rec, newCreateReq(validBody, bad))
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("status = %d, want %d", rec.Code, http.StatusUnauthorized)
		}
	})

	t.Run("valid submission is created", func(t *testing.T) {
		store := &fakeStore{}
		h := newTestHandler("OPEN", store, Limits{})
		rec := httptest.NewRecorder()
		h.Create(rec, newCreateReq(validBody, sessionCookie(testPlayer)))
		if rec.Code != http.StatusCreated {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusCreated, rec.Body.String())
		}
		var got contributionJSON
		if err := json.Unmarshal(rec.Body.Bytes(), &got); err != nil {
			t.Fatalf("decode body: %v", err)
		}
		if got.PlayerID != testPlayer || got.WorldID != testWorld || got.RoundID != testRound {
			t.Errorf("body = %+v, want player/world/round from request and cookie", got)
		}
		if !strings.HasPrefix(got.ID, idPrefix) {
			t.Errorf("ID = %q, want prefix %q", got.ID, idPrefix)
		}
		if !got.CreatedAt.Equal(fixedNow) {
			t.Errorf("CreatedAt = %v, want fixed clock %v", got.CreatedAt, fixedNow)
		}
		if len(store.saved) != 1 {
			t.Errorf("saved %d contributions, want 1", len(store.saved))
		}
	})

	cases := []struct {
		name   string
		status string
		store  *fakeStore
		limits Limits
		body   string
		want   int
	}{
		{
			name: "prompt too short is 400", status: "OPEN", store: &fakeStore{},
			body: `{"world_id":"` + testWorld + `","prompt":"x"}`, want: http.StatusBadRequest,
		},
		{
			name: "spam run is 400", status: "OPEN", store: &fakeStore{},
			body: `{"world_id":"` + testWorld + `","prompt":"aaaaaaaaaaaaaaa"}`, want: http.StatusBadRequest,
		},
		{
			name: "malformed json is 400", status: "OPEN", store: &fakeStore{},
			body: `{"world_id":`, want: http.StatusBadRequest,
		},
		{
			name: "unknown world is 404", status: "OPEN", store: &fakeStore{},
			body: `{"world_id":"nope","prompt":"a fine prompt"}`, want: http.StatusNotFound,
		},
		{
			name: "round not open is 409", status: "CLOSED", store: &fakeStore{},
			body: validBody, want: http.StatusConflict,
		},
		{
			name: "player at limit is 409", status: "OPEN", store: &fakeStore{count: 5},
			body: validBody, want: http.StatusConflict,
		},
		{
			name: "duplicate prompt is 409", status: "OPEN", store: &fakeStore{dup: true},
			body: validBody, want: http.StatusConflict,
		},
		{
			name: "rate limited is 429", status: "OPEN", store: &fakeStore{},
			limits: Limits{MinPromptLen: 3, MaxPromptLen: 500, MaxPerPlayer: 5, RateMax: 1, RateWindow: time.Minute},
			body:   validBody, want: http.StatusTooManyRequests,
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			h := newTestHandler(tc.status, tc.store, tc.limits)
			if tc.limits.RateMax > 0 {
				// Consume the single allowed hit so the request under test is denied.
				h.Service.rate().Allow(testPlayer, fixedNow)
			}
			rec := httptest.NewRecorder()
			h.Create(rec, newCreateReq(tc.body, sessionCookie(testPlayer)))
			if rec.Code != tc.want {
				t.Fatalf("status = %d, want %d (body=%q)", rec.Code, tc.want, rec.Body.String())
			}
			if rec.Code != http.StatusCreated && len(tc.store.saved) != 0 {
				t.Errorf("rejected submission was saved: %d records", len(tc.store.saved))
			}
		})
	}
}

// Given a handler with a reader holding one known contribution per player,
// when GET /api/v1/contributions/{id} and GET /api/v1/contributions/mine are called,
// then the owner gets 200 for a known id, unknown or foreign ids are 404,
// and mine lists only the cookie player's items for the requested round.
func TestGetAndMine(t *testing.T) {
	owned := Contribution{ID: "CON-owned", WorldID: testWorld, RoundID: testRound, PlayerID: testPlayer, Prompt: "mine", CreatedAt: fixedNow}
	other := Contribution{ID: "CON-other", WorldID: testWorld, RoundID: testRound, PlayerID: "player-2", Prompt: "theirs", CreatedAt: fixedNow}
	ownedSecond := Contribution{ID: "CON-owned-2", WorldID: testWorld, RoundID: testRound, PlayerID: testPlayer, Prompt: "mine again", CreatedAt: fixedNow}

	newRouter := func() http.Handler {
		h := newTestHandler("OPEN", &fakeStore{}, Limits{})
		h.Reader = &fakeReader{items: []Contribution{owned, other, ownedSecond}}
		r := chi.NewRouter()
		r.Get("/api/v1/contributions/mine", h.Mine)
		r.Get("/api/v1/contributions/{id}", h.Get)
		return r
	}
	do := func(r http.Handler, target string, cookie *http.Cookie) *httptest.ResponseRecorder {
		req := httptest.NewRequest(http.MethodGet, target, nil)
		if cookie != nil {
			req.AddCookie(cookie)
		}
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)
		return rec
	}

	t.Run("known id owned by caller is 200", func(t *testing.T) {
		rec := do(newRouter(), "/api/v1/contributions/CON-owned", sessionCookie(testPlayer))
		if rec.Code != http.StatusOK {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusOK, rec.Body.String())
		}
		var got contributionJSON
		if err := json.Unmarshal(rec.Body.Bytes(), &got); err != nil {
			t.Fatalf("decode body: %v", err)
		}
		if got.ID != owned.ID || got.Prompt != owned.Prompt {
			t.Errorf("body = %+v, want id %q prompt %q", got, owned.ID, owned.Prompt)
		}
	})

	t.Run("unknown id is 404", func(t *testing.T) {
		rec := do(newRouter(), "/api/v1/contributions/CON-missing", sessionCookie(testPlayer))
		if rec.Code != http.StatusNotFound {
			t.Fatalf("status = %d, want %d", rec.Code, http.StatusNotFound)
		}
	})

	t.Run("another player's id is 404", func(t *testing.T) {
		rec := do(newRouter(), "/api/v1/contributions/CON-other", sessionCookie(testPlayer))
		if rec.Code != http.StatusNotFound {
			t.Fatalf("status = %d, want %d", rec.Code, http.StatusNotFound)
		}
	})

	t.Run("get without cookie is 401", func(t *testing.T) {
		rec := do(newRouter(), "/api/v1/contributions/CON-owned", nil)
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("status = %d, want %d", rec.Code, http.StatusUnauthorized)
		}
	})

	t.Run("mine returns only the caller's items", func(t *testing.T) {
		rec := do(newRouter(), "/api/v1/contributions/mine?round_id="+testRound, sessionCookie(testPlayer))
		if rec.Code != http.StatusOK {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusOK, rec.Body.String())
		}
		var got []contributionJSON
		if err := json.Unmarshal(rec.Body.Bytes(), &got); err != nil {
			t.Fatalf("decode body: %v", err)
		}
		if len(got) != 2 {
			t.Fatalf("got %d items, want 2: %+v", len(got), got)
		}
		for _, c := range got {
			if c.PlayerID != testPlayer {
				t.Errorf("item %q belongs to %q, want only %q", c.ID, c.PlayerID, testPlayer)
			}
		}
	})

	t.Run("mine with unsafe round_id is 400", func(t *testing.T) {
		rec := do(newRouter(), "/api/v1/contributions/mine?round_id=../etc", sessionCookie(testPlayer))
		if rec.Code != http.StatusBadRequest {
			t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
		}
	})

	t.Run("mine without cookie is 401", func(t *testing.T) {
		rec := do(newRouter(), "/api/v1/contributions/mine?round_id="+testRound, nil)
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("status = %d, want %d", rec.Code, http.StatusUnauthorized)
		}
	})
}
