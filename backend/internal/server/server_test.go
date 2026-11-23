package server

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"

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
