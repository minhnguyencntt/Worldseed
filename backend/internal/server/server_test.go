package server

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
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
