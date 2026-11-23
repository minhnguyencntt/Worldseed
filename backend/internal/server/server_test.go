package server

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/worldseed/storyforge/backend/internal/config"
)

// Given a server built from a config with a token secret and a discarded logger,
// when GET /healthz is requested, then it responds 200 with a JSON body {"status":"ok"}.
func TestHealthz(t *testing.T) {
	cfg := &config.Config{
		Auth: config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session"},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := New(cfg, log)

	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}
	if ct := rec.Header().Get("Content-Type"); ct != "application/json" {
		t.Errorf("Content-Type = %q, want %q", ct, "application/json")
	}
	var body map[string]string
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatalf("body is not JSON: %v (body=%q)", err, rec.Body.String())
	}
	if body["status"] != "ok" {
		t.Errorf("body status = %q, want %q", body["status"], "ok")
	}
}

// Given a server built from a config with a token secret, cookie name and 1h TTL,
// when a session is created with POST /api/v1/player/session and its Set-Cookie is sent
// with GET /api/v1/player/me, then the me response is 200 with the same id as the session body.
func TestSessionThenMe(t *testing.T) {
	cfg := &config.Config{
		Auth: config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := New(cfg, log)

	sessRec := httptest.NewRecorder()
	h.ServeHTTP(sessRec, httptest.NewRequest(http.MethodPost, "/api/v1/player/session", nil))
	if sessRec.Code != http.StatusCreated {
		t.Fatalf("session status = %d, want %d", sessRec.Code, http.StatusCreated)
	}
	var sess map[string]string
	if err := json.Unmarshal(sessRec.Body.Bytes(), &sess); err != nil {
		t.Fatalf("decode session body: %v", err)
	}

	cookies := sessRec.Result().Cookies()
	if len(cookies) == 0 {
		t.Fatal("session response set no cookie")
	}
	meReq := httptest.NewRequest(http.MethodGet, "/api/v1/player/me", nil)
	for _, c := range cookies {
		meReq.AddCookie(c)
	}
	meRec := httptest.NewRecorder()
	h.ServeHTTP(meRec, meReq)

	if meRec.Code != http.StatusOK {
		t.Fatalf("me status = %d, want %d (body=%q)", meRec.Code, http.StatusOK, meRec.Body.String())
	}
	var me map[string]string
	if err := json.Unmarshal(meRec.Body.Bytes(), &me); err != nil {
		t.Fatalf("decode me body: %v", err)
	}
	if me["id"] != sess["id"] {
		t.Fatalf("me id = %q, want session id %q", me["id"], sess["id"])
	}
}

// Given a server built from a config whose storage.repo_path is a temporary directory,
// when GET /api/v1/worlds is requested, then it responds 200,
// and when POST /api/v1/contributions is sent without a session cookie, then it responds 401.
func TestNew_RegistersRoutes(t *testing.T) {
	cfg := &config.Config{
		Auth:    config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
		Storage: config.StorageConfig{RepoPath: t.TempDir()},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := New(cfg, log)

	t.Run("GET /api/v1/worlds is served", func(t *testing.T) {
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/v1/worlds", nil))
		if rec.Code != http.StatusOK {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusOK, rec.Body.String())
		}
	})

	t.Run("POST /api/v1/contributions without cookie is unauthorized", func(t *testing.T) {
		rec := httptest.NewRecorder()
		req := httptest.NewRequest(http.MethodPost, "/api/v1/contributions", strings.NewReader(`{"prompt":"hello there"}`))
		req.Header.Set("Content-Type", "application/json")
		h.ServeHTTP(rec, req)
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusUnauthorized, rec.Body.String())
		}
	})
}

// Given a server built from a config whose storage.repo_path is a temporary directory,
// and a player session created with POST /api/v1/player/session,
// when GET /api/v1/player/me/contributions?round_id=ROUND-0000001 is requested with the session cookies,
// then it responds 200 with an empty JSON array,
// when the legacy GET /api/v1/contributions/mine?round_id=ROUND-0000001 is requested with the same cookies,
// then it responds 404 because the path no longer serves Mine,
// and when GET /api/v1/player/me/contributions?round_id=ROUND-0000001 is requested without cookies,
// then it responds 401.
func TestNew_PlayerContributionsRoute(t *testing.T) {
	cfg := &config.Config{
		Auth:    config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
		Storage: config.StorageConfig{RepoPath: t.TempDir()},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := New(cfg, log)

	sessRec := httptest.NewRecorder()
	h.ServeHTTP(sessRec, httptest.NewRequest(http.MethodPost, "/api/v1/player/session", nil))
	if sessRec.Code != http.StatusCreated {
		t.Fatalf("session status = %d, want %d", sessRec.Code, http.StatusCreated)
	}
	cookies := sessRec.Result().Cookies()
	if len(cookies) == 0 {
		t.Fatal("session response set no cookie")
	}

	const path = "/api/v1/player/me/contributions?round_id=ROUND-0000001"
	withCookies := func(method, target string) *http.Request {
		req := httptest.NewRequest(method, target, nil)
		for _, c := range cookies {
			req.AddCookie(c)
		}
		return req
	}

	t.Run("GET /api/v1/player/me/contributions with session is served as an empty list", func(t *testing.T) {
		rec := httptest.NewRecorder()
		req := withCookies(http.MethodGet, path)
		h.ServeHTTP(rec, req)
		const want = http.StatusOK
		if rec.Code != want {
			t.Fatalf("status = %d, want %d", rec.Code, want)
		}
		if got := strings.TrimSpace(rec.Body.String()); got != "[]" {
			t.Fatalf("body = %q, want %q", got, "[]")
		}
	})

	t.Run("GET /api/v1/contributions/mine with session is no longer served", func(t *testing.T) {
		rec := httptest.NewRecorder()
		req := withCookies(http.MethodGet, "/api/v1/contributions/mine?round_id=ROUND-0000001")
		h.ServeHTTP(rec, req)
		const want = http.StatusNotFound
		if rec.Code != want {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, want, rec.Body.String())
		}
	})

	t.Run("GET /api/v1/player/me/contributions without session is unauthorized", func(t *testing.T) {
		rec := httptest.NewRecorder()
		req := httptest.NewRequest(http.MethodGet, path, nil)
		h.ServeHTTP(rec, req)
		const want = http.StatusUnauthorized
		if rec.Code != want {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, want, rec.Body.String())
		}
	})
}

// Given a server built from a config whose storage.repo_path is a temporary directory
// that holds the world the-boys-room and round-0000001 (status open),
// when GET /api/v1/worlds/the-boys-room/round/current is requested, then it responds 200 with round-0000001 in the body,
// when GET /api/v1/worlds/the-boys-room/rounds/current is requested, then it responds 404 because the plural path is not routed,
// and when GET /api/v1/worlds/unknown/round/current is requested, then it responds 404.
func TestNew_CurrentRoundRoute(t *testing.T) {
	root := t.TempDir()
	writeTestFile(t, filepath.Join(root, "worlds", "the-boys-room", "world.yaml"),
		"id: the-boys-room\ntitle: The Boys Room\n")
	writeTestFile(t, filepath.Join(root, "rounds", "round-0000001", "round.yaml"),
		"id: round-0000001\nnumber: 1\nstatus: open\n"+
			"starts_at: 2026-01-01T00:00:00Z\nends_at: 2026-01-02T00:00:00Z\n")

	cfg := &config.Config{
		Auth:    config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
		Storage: config.StorageConfig{RepoPath: root},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := New(cfg, log)

	t.Run("GET /api/v1/worlds/the-boys-room/round/current is served with the current round", func(t *testing.T) {
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/v1/worlds/the-boys-room/round/current", nil))
		if rec.Code != http.StatusOK {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusOK, rec.Body.String())
		}
		if !strings.Contains(rec.Body.String(), "round-0000001") {
			t.Fatalf("body = %q, want it to contain round-0000001", rec.Body.String())
		}
	})

	t.Run("GET /api/v1/worlds/the-boys-room/rounds/current is not served", func(t *testing.T) {
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/v1/worlds/the-boys-room/rounds/current", nil))
		if rec.Code != http.StatusNotFound {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusNotFound, rec.Body.String())
		}
	})

	t.Run("GET /api/v1/worlds/unknown/round/current is not found", func(t *testing.T) {
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/v1/worlds/unknown/round/current", nil))
		if rec.Code != http.StatusNotFound {
			t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusNotFound, rec.Body.String())
		}
	})
}

// Given a server built from a config with admin.token "tok" and a temporary repo_path,
// when the admin round endpoints are requested without an Authorization header,
// then each responds 401, and when the same requests carry "Authorization: Bearer tok",
// then none of them responds 401.
func TestNew_AdminRoundsRequireToken(t *testing.T) {
	cfg := &config.Config{
		Auth:    config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
		Storage: config.StorageConfig{RepoPath: t.TempDir()},
		Admin:   config.AdminConfig{Token: "tok"},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := New(cfg, log)

	endpoints := []struct {
		method string
		path   string
	}{
		{http.MethodPost, "/api/v1/admin/rounds"},
		{http.MethodPost, "/api/v1/admin/rounds/ROUND-0000001/open"},
		{http.MethodPost, "/api/v1/admin/rounds/ROUND-0000001/close"},
		{http.MethodGet, "/api/v1/admin/rounds/ROUND-0000001"},
		{http.MethodGet, "/api/v1/admin/rounds/ROUND-0000001/contributions"},
	}

	for _, ep := range endpoints {
		t.Run(ep.method+" "+ep.path+" without a token is unauthorized", func(t *testing.T) {
			rec := httptest.NewRecorder()
			h.ServeHTTP(rec, httptest.NewRequest(ep.method, ep.path+"?world=the-boys-room", nil))
			if rec.Code != http.StatusUnauthorized {
				t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusUnauthorized, rec.Body.String())
			}
		})

		t.Run(ep.method+" "+ep.path+" with Bearer tok is not unauthorized", func(t *testing.T) {
			rec := httptest.NewRecorder()
			req := httptest.NewRequest(ep.method, ep.path+"?world=the-boys-room", nil)
			req.Header.Set("Authorization", "Bearer tok")
			h.ServeHTTP(rec, req)
			if rec.Code == http.StatusUnauthorized {
				t.Fatalf("status = %d, want anything but %d (body=%q)", rec.Code, http.StatusUnauthorized, rec.Body.String())
			}
		})
	}
}

// writeTestFile creates parent directories and writes content to path, failing the test on error.
func writeTestFile(t *testing.T, path, content string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatalf("mkdir %s: %v", filepath.Dir(path), err)
	}
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("write %s: %v", path, err)
	}
}
