// Package server builds the StoryForge HTTP handler.
package server

import (
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/worldseed/storyforge/backend/internal/config"
	"github.com/worldseed/storyforge/backend/internal/contribution"
	"github.com/worldseed/storyforge/backend/internal/gitrepo"
	"github.com/worldseed/storyforge/backend/internal/player"
	"github.com/worldseed/storyforge/backend/internal/world"
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

	repo := &world.Repo{Root: cfg.Storage.RepoPath, ContentDir: cfg.Storage.ContentDir}
	wh := &world.Handler{Repo: repo}
	r.Get("/api/v1/worlds", wh.List)
	r.Get("/api/v1/worlds/{id}", wh.Get)
	r.Get("/api/v1/worlds/{id}/game", wh.Game)
	r.Get("/api/v1/worlds/{id}/round/current", wh.CurrentRound)

	store := &contribution.FileStore{
		Root: cfg.Storage.RepoPath,
		Git: &gitrepo.CLI{
			Dir:      cfg.Storage.RepoPath,
			BotName:  cfg.Git.BotName,
			BotEmail: cfg.Git.BotEmail,
		},
	}
	svc := &contribution.Service{
		Rounds: roundSource{repo: repo},
		Store:  contribution.NewValidationStore(store),
		Limits: contribution.Limits{
			MinPromptLen: cfg.Contribution.MinPromptLen,
			MaxPromptLen: cfg.Contribution.MaxPromptLen,
			MaxPerPlayer: cfg.Contribution.MaxPerPlayer,
			RateMax:      cfg.Contribution.RateMax,
			RateWindow:   cfg.Contribution.RateWindow,
		},
		Now: time.Now,
	}
	ch := &contribution.Handler{
		Service:    svc,
		Reader:     store,
		Secret:     []byte(cfg.Auth.TokenSecret),
		CookieName: cfg.Auth.CookieName,
		TTL:        cfg.Auth.TokenTTL,
		Now:        time.Now,
	}
	r.Post("/api/v1/contributions", ch.Create)
	r.Get("/api/v1/player/me/contributions", ch.Mine)
	r.Get("/api/v1/contributions/{id}", ch.Get)

	return r
}

// roundSource resolves a world's current round for the contribution service.
type roundSource struct {
	repo *world.Repo
}

func (s roundSource) Current(worldID string) (contribution.Round, error) {
	rd, err := s.repo.CurrentRound(worldID)
	if errors.Is(err, world.ErrNotFound) {
		return contribution.Round{}, contribution.ErrWorldNotFound
	}
	if err != nil {
		return contribution.Round{}, err
	}
	return contribution.Round{ID: rd.ID, Status: rd.Status}, nil
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
