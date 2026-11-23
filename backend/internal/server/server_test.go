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

	"github.com/go-chi/chi/v5"

	"github.com/worldseed/storyforge/backend/internal/admin"
	"github.com/worldseed/storyforge/backend/internal/config"
	"github.com/worldseed/storyforge/backend/internal/execution"
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

// Given a server built from a config with admin.token "tok" and a temporary repo_path
// that holds the world the-boys-room and round-0000001,
// when each admin round endpoint is requested with "Authorization: Bearer tok",
// then the route is mounted, so the response is not 404.
// (TestNew_AdminRoundsRequireToken alone cannot prove this: chi runs the admin
// group middleware for unmatched paths too, so an unmounted route also returns 404 there.
// The round must exist on disk too, otherwise the handler itself answers 404 for an unknown round.)
func TestNew_AdminRoundsAreMounted(t *testing.T) {
	root := t.TempDir()
	writeTestFile(t, filepath.Join(root, "worlds", "the-boys-room", "world.yaml"),
		"id: the-boys-room\ntitle: The Boys Room\n")
	writeTestFile(t, filepath.Join(root, "worlds", "the-boys-room", "rounds", "round-0000001", "round.yaml"),
		"id: ROUND-0000001\nworld: the-boys-room\nnumber: 1\nstatus: SCHEDULED\n"+
			"starts_at: 2026-01-01T00:00:00Z\nends_at: 2026-01-02T00:00:00Z\nbase_release: 1.0.0\n")

	cfg := &config.Config{
		Auth:    config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
		Storage: config.StorageConfig{RepoPath: root},
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
		t.Run(ep.method+" "+ep.path+" with Bearer tok is mounted", func(t *testing.T) {
			rec := httptest.NewRecorder()
			req := httptest.NewRequest(ep.method, ep.path+"?world=the-boys-room", nil)
			req.Header.Set("Authorization", "Bearer tok")
			h.ServeHTTP(rec, req)
			if rec.Code == http.StatusNotFound {
				t.Fatalf("status = 404, want the route to be mounted (body=%q)", rec.Body.String())
			}
		})
	}
}

// Given a server built from a config with admin.token "tok" and a temporary repo_path
// that holds the world the-boys-room and round-0000001,
// when GET /api/v1/admin/rounds/ROUND-0000001?world=the-boys-room, GET for the unknown
// ROUND-9999999 and POST /api/v1/admin/rounds with the body {bad are each requested with
// "Authorization: Bearer tok",
// then the statuses are exactly 200 with the JSON id ROUND-0000001, 404 and 400.
func TestNew_AdminRoundRoutesReturnHandlerStatuses(t *testing.T) {
	root := t.TempDir()
	writeTestFile(t, filepath.Join(root, "worlds", "the-boys-room", "world.yaml"),
		"id: the-boys-room\ntitle: The Boys Room\n")
	writeTestFile(t, filepath.Join(root, "worlds", "the-boys-room", "rounds", "round-0000001", "round.yaml"),
		"id: ROUND-0000001\nworld: the-boys-room\nnumber: 1\nstatus: SCHEDULED\n"+
			"starts_at: 2026-01-01T00:00:00Z\nends_at: 2026-01-02T00:00:00Z\nbase_release: 1.0.0\n")

	cfg := &config.Config{
		Auth:    config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
		Storage: config.StorageConfig{RepoPath: root},
		Admin:   config.AdminConfig{Token: "tok"},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := New(cfg, log)

	cases := []struct {
		name       string
		method     string
		target     string
		body       string
		wantStatus int
		wantID     string
	}{
		{
			name:       "GET an existing round responds 200 with its id",
			method:     http.MethodGet,
			target:     "/api/v1/admin/rounds/ROUND-0000001?world=the-boys-room",
			wantStatus: http.StatusOK,
			wantID:     "ROUND-0000001",
		},
		{
			name:       "GET an unknown round responds 404",
			method:     http.MethodGet,
			target:     "/api/v1/admin/rounds/ROUND-9999999?world=the-boys-room",
			wantStatus: http.StatusNotFound,
		},
		{
			name:       "POST a malformed JSON body responds 400",
			method:     http.MethodPost,
			target:     "/api/v1/admin/rounds",
			body:       "{bad",
			wantStatus: http.StatusBadRequest,
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			rec := httptest.NewRecorder()
			req := httptest.NewRequest(c.method, c.target, strings.NewReader(c.body))
			req.Header.Set("Authorization", "Bearer tok")
			h.ServeHTTP(rec, req)
			if rec.Code != c.wantStatus {
				t.Fatalf("status = %d, want %d (body=%q)", rec.Code, c.wantStatus, rec.Body.String())
			}
			if c.wantID != "" {
				var body struct {
					ID string `json:"id"`
				}
				if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
					t.Fatalf("body is not JSON: %v (body=%q)", err, rec.Body.String())
				}
				if body.ID != c.wantID {
					t.Errorf("id = %q, want %q", body.ID, c.wantID)
				}
			}
		})
	}
}

// Given a server built from a config with admin.token "tok" and a temporary repo_path,
// when each admin round route from adminRoundRoutes is requested with no Authorization header
// and when the same route is requested with "Authorization: Bearer wrong",
// then every request responds 401.
func TestNew_AdminRoundRoutesRejectMissingAndWrongToken(t *testing.T) {
	cfg := &config.Config{
		Auth:    config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
		Storage: config.StorageConfig{RepoPath: t.TempDir()},
		Admin:   config.AdminConfig{Token: "tok"},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := New(cfg, log)

	cases := []struct {
		name   string
		header string
	}{
		{"without a token", ""},
		{"with Bearer wrong", "Bearer wrong"},
	}

	for _, rt := range adminRoundRoutes(&admin.RoundHandler{}) {
		path := "/api/v1/admin" + strings.ReplaceAll(rt.Pattern, "{id}", "ROUND-0000001")
		for _, c := range cases {
			t.Run(rt.Method+" "+path+" "+c.name+" is unauthorized", func(t *testing.T) {
				rec := httptest.NewRecorder()
				req := httptest.NewRequest(rt.Method, path, nil)
				if c.header != "" {
					req.Header.Set("Authorization", c.header)
				}
				h.ServeHTTP(rec, req)
				if rec.Code != http.StatusUnauthorized {
					t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusUnauthorized, rec.Body.String())
				}
			})
		}
	}
}

// Given a server built from a config with admin.token "tok" and a temporary repo_path,
// when every route from adminRoutes (execution and round routes) is requested with no
// Authorization header and with "Authorization: Bearer wrong", then every request responds 401,
// and when POST /api/v1/admin/executions/ID-1/retry and POST /api/v1/admin/executions/ID-1/approve
// are requested with "Authorization: Bearer tok", then neither responds 401.
func TestNew_AllAdminRoutesRejectMissingAndWrongToken(t *testing.T) {
	cfg := &config.Config{
		Auth:    config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
		Storage: config.StorageConfig{RepoPath: t.TempDir()},
		Admin:   config.AdminConfig{Token: "tok"},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := New(cfg, log)

	cases := []struct {
		name   string
		header string
	}{
		{"without a token", ""},
		{"with Bearer wrong", "Bearer wrong"},
	}

	for _, rt := range adminRoutes(&execution.Handler{}, &admin.RoundHandler{}) {
		path := "/api/v1/admin" + strings.ReplaceAll(rt.Pattern, "{id}", "ID-1")
		for _, c := range cases {
			t.Run(rt.Method+" "+path+" "+c.name+" is unauthorized", func(t *testing.T) {
				rec := httptest.NewRecorder()
				req := httptest.NewRequest(rt.Method, path, nil)
				if c.header != "" {
					req.Header.Set("Authorization", c.header)
				}
				h.ServeHTTP(rec, req)
				if rec.Code != http.StatusUnauthorized {
					t.Fatalf("status = %d, want %d (body=%q)", rec.Code, http.StatusUnauthorized, rec.Body.String())
				}
			})
		}
	}

	for _, path := range []string{
		"/api/v1/admin/executions/ID-1/retry",
		"/api/v1/admin/executions/ID-1/approve",
	} {
		t.Run(http.MethodPost+" "+path+" with Bearer tok is not unauthorized", func(t *testing.T) {
			rec := httptest.NewRecorder()
			req := httptest.NewRequest(http.MethodPost, path, nil)
			req.Header.Set("Authorization", "Bearer tok")
			h.ServeHTTP(rec, req)
			if rec.Code == http.StatusUnauthorized {
				t.Fatalf("status = %d, want anything but %d (body=%q)", rec.Code, http.StatusUnauthorized, rec.Body.String())
			}
		})
	}
}

// Given a server built from a config with admin.token "tok" and a temporary repo_path,
// when the router built by New is walked with chi.Walk,
// then the admin routes it serves under /api/v1/admin are exactly the method and pattern pairs
// listed in adminRoutes, each prefixed with /api/v1/admin, with no extra admin route.
func TestNew_AdminRoutesMatchTable(t *testing.T) {
	cfg := &config.Config{
		Auth:    config.AuthConfig{TokenSecret: "test-secret", CookieName: "sf_session", TokenTTL: time.Hour},
		Storage: config.StorageConfig{RepoPath: t.TempDir()},
		Admin:   config.AdminConfig{Token: "tok"},
	}
	log := slog.New(slog.NewTextHandler(io.Discard, nil))
	routes, ok := New(cfg, log).(chi.Routes)
	if !ok {
		t.Fatal("New did not return a chi.Routes handler")
	}

	const prefix = "/api/v1/admin"
	walked := map[string]bool{}
	err := chi.Walk(routes, func(method, route string, _ http.Handler, _ ...func(http.Handler) http.Handler) error {
		if strings.HasPrefix(route, prefix) {
			walked[method+" "+route] = true
		}
		return nil
	})
	if err != nil {
		t.Fatalf("chi.Walk: %v", err)
	}

	want := map[string]bool{}
	for _, rt := range adminRoutes(&execution.Handler{}, &admin.RoundHandler{}) {
		want[rt.Method+" "+prefix+rt.Pattern] = true
	}

	for key := range want {
		if !walked[key] {
			t.Errorf("route %s is listed in adminRoutes but not served", key)
		}
	}
	for key := range walked {
		if !want[key] {
			t.Errorf("route %s is served under %s but not listed in adminRoutes", key, prefix)
		}
	}
}

// Given the admin round route table built by adminRoundRoutes,
// when it is read,
// then it lists exactly five method and pattern pairs in this order:
// POST /rounds, POST /rounds/{id}/open, POST /rounds/{id}/close,
// GET /rounds/{id}, GET /rounds/{id}/contributions.
func TestAdminRoundRoutes_Table(t *testing.T) {
	want := []struct {
		method  string
		pattern string
	}{
		{http.MethodPost, "/rounds"},
		{http.MethodPost, "/rounds/{id}/open"},
		{http.MethodPost, "/rounds/{id}/close"},
		{http.MethodGet, "/rounds/{id}"},
		{http.MethodGet, "/rounds/{id}/contributions"},
	}

	got := adminRoundRoutes(&admin.RoundHandler{})
	if len(got) != len(want) {
		t.Fatalf("route count = %d, want %d", len(got), len(want))
	}
	for i, w := range want {
		if got[i].Method != w.method || got[i].Pattern != w.pattern {
			t.Errorf("route[%d] = %s %s, want %s %s", i, got[i].Method, got[i].Pattern, w.method, w.pattern)
		}
	}
}

// Given a config with round.scheduler_interval 7s and a temporary storage.repo_path,
// when NewScheduler is built from it,
// then the scheduler interval is 7s and both the controller and the round store are wired.
func TestNewScheduler_UsesConfig(t *testing.T) {
	cfg := &config.Config{
		Storage: config.StorageConfig{RepoPath: t.TempDir()},
		Round:   config.RoundConfig{SchedulerInterval: 7 * time.Second},
	}
	sched := NewScheduler(cfg)
	if sched.Interval != 7*time.Second {
		t.Fatalf("Interval = %v, want %v", sched.Interval, 7*time.Second)
	}
	if sched.Controller == nil {
		t.Fatal("Controller is nil, want the round service")
	}
	if sched.Rounds == nil {
		t.Fatal("Rounds is nil, want the round file store")
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
