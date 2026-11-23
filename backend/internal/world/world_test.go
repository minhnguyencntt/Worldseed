package world

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/go-chi/chi/v5"
)

// writeFile creates path (and its parent directories) under t.TempDir with body.
func writeFile(t *testing.T, path, body string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatalf("mkdir %s: %v", filepath.Dir(path), err)
	}
	if err := os.WriteFile(path, []byte(body), 0o644); err != nil {
		t.Fatalf("write %s: %v", path, err)
	}
}

const theBoysRoomYAML = "id: the-boys-room\ntitle: The Boys Room\n"

// Given a repository with one world on disk
// When the worlds are listed and one is fetched by id
// Then the world is returned and unknown or unsafe ids are ErrNotFound.
func TestList_And_Get(t *testing.T) {
	root := t.TempDir()
	writeFile(t, filepath.Join(root, "worlds", "the-boys-room", "world.yaml"), theBoysRoomYAML)
	repo := &Repo{Root: root, ContentDir: root}

	worlds, err := repo.List()
	if err != nil {
		t.Fatalf("List: unexpected error: %v", err)
	}
	if len(worlds) != 1 || worlds[0].ID != "the-boys-room" {
		t.Fatalf("List = %+v, want [the-boys-room]", worlds)
	}

	got, err := repo.Get("the-boys-room")
	if err != nil {
		t.Fatalf("Get(the-boys-room): unexpected error: %v", err)
	}
	if got.ID != "the-boys-room" || got.Title != "The Boys Room" {
		t.Fatalf("Get(the-boys-room) = %+v, want id and title from world.yaml", got)
	}

	if _, err := repo.Get("missing"); !errors.Is(err, ErrNotFound) {
		t.Errorf("Get(missing) error = %v, want ErrNotFound", err)
	}
	if _, err := repo.Get("../x"); !errors.Is(err, ErrNotFound) {
		t.Errorf("Get(../x) error = %v, want ErrNotFound", err)
	}
}

// Given two rounds on disk, round 1 and round 2, under a known world
// When the current round is requested for that world
// Then the round with the highest number is returned with its status and parsed times.
func TestCurrentRound_HighestNumber(t *testing.T) {
	root := t.TempDir()
	writeFile(t, filepath.Join(root, "worlds", "the-boys-room", "world.yaml"), theBoysRoomYAML)
	writeFile(t, filepath.Join(root, "rounds", "round-0000001", "round.yaml"),
		"id: round-0000001\nnumber: 1\nstatus: closed\n"+
			"starts_at: 2026-01-01T00:00:00Z\nends_at: 2026-01-08T00:00:00Z\n")
	writeFile(t, filepath.Join(root, "rounds", "round-0000002", "round.yaml"),
		"id: round-0000002\nnumber: 2\nstatus: open\n"+
			"starts_at: 2026-01-08T00:00:00Z\nends_at: 2026-01-15T00:00:00Z\n")
	repo := &Repo{Root: root, ContentDir: root}

	round, err := repo.CurrentRound("the-boys-room")
	if err != nil {
		t.Fatalf("CurrentRound: unexpected error: %v", err)
	}
	if round.Number != 2 {
		t.Errorf("Number = %d, want 2", round.Number)
	}
	if round.ID != "round-0000002" {
		t.Errorf("ID = %q, want round-0000002", round.ID)
	}
	if round.Status != "open" {
		t.Errorf("Status = %q, want open", round.Status)
	}
	wantStart := time.Date(2026, 1, 8, 0, 0, 0, 0, time.UTC)
	wantEnd := time.Date(2026, 1, 15, 0, 0, 0, 0, time.UTC)
	if !round.StartsAt.Equal(wantStart) {
		t.Errorf("StartsAt = %v, want %v", round.StartsAt, wantStart)
	}
	if !round.EndsAt.Equal(wantEnd) {
		t.Errorf("EndsAt = %v, want %v", round.EndsAt, wantEnd)
	}
}

// Given a world with a game scene and a round on disk
// When the list, get, game and current-round endpoints are requested through chi
// Then each known route responds 200 with JSON, and an unknown world id responds 404.
func TestHandlers_StatusAndJSON(t *testing.T) {
	root := t.TempDir()
	writeFile(t, filepath.Join(root, "worlds", "the-boys-room", "world.yaml"), theBoysRoomYAML)
	writeFile(t, filepath.Join(root, "worlds", "the-boys-room", "scenes", "001-intro.yaml"),
		"id: intro\ntitle: Intro\n")
	writeFile(t, filepath.Join(root, "rounds", "round-0000001", "round.yaml"),
		"id: round-0000001\nnumber: 1\nstatus: open\n"+
			"starts_at: 2026-01-01T00:00:00Z\nends_at: 2026-01-08T00:00:00Z\n")

	// Game reads world and scene content from ContentDir; here both point at root.
	repo := &Repo{Root: root, ContentDir: root}
	h := &Handler{Repo: repo}

	r := chi.NewRouter()
	r.Get("/worlds", h.List)
	r.Get("/worlds/{id}", h.Get)
	r.Get("/worlds/{id}/game", h.Game)
	r.Get("/worlds/{id}/round/current", h.CurrentRound)

	cases := []struct {
		name string
		path string
	}{
		{"list worlds", "/worlds"},
		{"get world", "/worlds/the-boys-room"},
		{"game content", "/worlds/the-boys-room/game"},
		{"current round", "/worlds/the-boys-room/round/current"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			rec := httptest.NewRecorder()
			r.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, tc.path, nil))

			if rec.Code != http.StatusOK {
				t.Fatalf("GET %s status = %d, want 200; body=%q", tc.path, rec.Code, rec.Body.String())
			}
			if ct := rec.Header().Get("Content-Type"); ct != "application/json" {
				t.Errorf("GET %s Content-Type = %q, want application/json", tc.path, ct)
			}
			var v any
			if err := json.Unmarshal(rec.Body.Bytes(), &v); err != nil {
				t.Errorf("GET %s body is not valid JSON: %v; body=%q", tc.path, err, rec.Body.String())
			}
		})
	}

	t.Run("unknown world id is 404", func(t *testing.T) {
		for _, path := range []string{
			"/worlds/missing",
			"/worlds/missing/game",
			"/worlds/missing/round/current",
		} {
			rec := httptest.NewRecorder()
			r.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, path, nil))
			if rec.Code != http.StatusNotFound {
				t.Errorf("GET %s status = %d, want 404", path, rec.Code)
			}
		}
	})
}
