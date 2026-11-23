// Package server builds the StoryForge HTTP handler.
package server

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/worldseed/storyforge/backend/internal/config"
	"github.com/worldseed/storyforge/backend/internal/player"
)

// New returns the root HTTP handler with request logging and the health route.
func New(cfg *config.Config, log *slog.Logger) http.Handler {
	r := chi.NewRouter()
	r.Use(requestLogger(log))

	r.Get("/healthz", func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})

	ph := &player.Handler{
		Secret:     []byte(cfg.Auth.TokenSecret),
		CookieName: cfg.Auth.CookieName,
		TTL:        cfg.Auth.TokenTTL,
		Secure:     cfg.Auth.CookieSecure,
		Now:        time.Now,
	}
	r.Post("/api/v1/player/session", ph.CreateSession)
	r.Get("/api/v1/player/me", ph.Me)

	return r
}

// statusRecorder captures the status code written by downstream handlers.
type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (s *statusRecorder) WriteHeader(code int) {
	s.status = code
	s.ResponseWriter.WriteHeader(code)
}

func (s *statusRecorder) Write(b []byte) (int, error) {
	if s.status == 0 {
		s.status = http.StatusOK
	}
	return s.ResponseWriter.Write(b)
}

func requestLogger(log *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			rec := &statusRecorder{ResponseWriter: w}
			next.ServeHTTP(rec, r)
			if rec.status == 0 {
				rec.status = http.StatusOK
			}
			log.Info("request",
				"method", r.Method,
				"path", r.URL.Path,
				"status", rec.status,
				"duration", time.Since(start),
			)
		})
	}
}
