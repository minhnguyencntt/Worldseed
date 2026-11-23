// Package server builds the StoryForge HTTP handler.
package server

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/worldseed/storyforge/backend/internal/admin"
	"github.com/worldseed/storyforge/backend/internal/config"
	"github.com/worldseed/storyforge/backend/internal/contribution"
	"github.com/worldseed/storyforge/backend/internal/gitrepo"
	"github.com/worldseed/storyforge/backend/internal/player"
	"github.com/worldseed/storyforge/backend/internal/round"
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

	gitCLI := &gitrepo.CLI{
		Dir:      cfg.Storage.RepoPath,
		BotName:  cfg.Git.BotName,
		BotEmail: cfg.Git.BotEmail,
	}
	store := &contribution.FileStore{
		Root: cfg.Storage.RepoPath,
		Git:  gitCLI,
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

	rs := newRoundService(cfg)
	rh := &admin.RoundHandler{
		Rounds: roundDefaults{
			RoundService: &roundAdmin{Svc: rs},
			Duration:     cfg.Round.Duration,
			BaseRelease:  cfg.Round.BaseRelease,
		},
		Lister: store,
	}
	r.Route("/api/v1/admin", func(ar chi.Router) {
		ar.Use(admin.Middleware(cfg.Admin.Token))
		for _, rt := range adminRoundRoutes(rh) {
			ar.Method(rt.Method, rt.Pattern, rt.Handler)
		}
	})

	return r
}

// adminRoute is one admin route registered under /api/v1/admin.
type adminRoute struct {
	Method  string
	Pattern string
	Handler http.HandlerFunc
}

// adminRoundRoutes lists the admin round routes so New and tests share one table.
func adminRoundRoutes(rh *admin.RoundHandler) []adminRoute {
	return []adminRoute{
		{http.MethodPost, "/rounds", rh.Create},
		{http.MethodPost, "/rounds/{id}/open", rh.Open},
		{http.MethodPost, "/rounds/{id}/close", rh.Close},
		{http.MethodGet, "/rounds/{id}", rh.Get},
		{http.MethodGet, "/rounds/{id}/contributions", rh.Contributions},
	}
}

// NewScheduler returns the round scheduler that opens and closes rounds on the
// configured interval. The caller runs it with Run.
func NewScheduler(cfg *config.Config) *round.Scheduler {
	repo := &world.Repo{Root: cfg.Storage.RepoPath, ContentDir: cfg.Storage.ContentDir}
	return &round.Scheduler{
		Controller: newRoundService(cfg),
		Rounds:     &round.FileStore{Root: cfg.Storage.RepoPath},
		Worlds: func() ([]string, error) {
			worlds, err := repo.List()
			if err != nil {
				return nil, err
			}
			ids := make([]string, 0, len(worlds))
			for _, w := range worlds {
				ids = append(ids, w.ID)
			}
			return ids, nil
		},
		Interval: cfg.Round.SchedulerInterval,
	}
}

// newRoundService builds the round lifecycle service backed by the repo's files and Git.
func newRoundService(cfg *config.Config) *round.Service {
	gitCLI := &gitrepo.CLI{
		Dir:      cfg.Storage.RepoPath,
		BotName:  cfg.Git.BotName,
		BotEmail: cfg.Git.BotEmail,
	}
	return &round.Service{
		Store:         &round.FileStore{Root: cfg.Storage.RepoPath},
		Committer:     gitCLI,
		Revisions:     gitCLI,
		Contributions: &contribution.FileStore{Root: cfg.Storage.RepoPath, Git: gitCLI},
	}
}

// roundDefaults fills the config round defaults that admin.CreateRoundInput
// leaves to the service, so round.Service never sees a zero duration.
type roundDefaults struct {
	admin.RoundService
	Duration    time.Duration
	BaseRelease string
}

func (d roundDefaults) Create(ctx context.Context, in admin.CreateRoundInput) (world.Round, error) {
	if in.Duration == 0 {
		in.Duration = d.Duration
	}
	if in.BaseRelease == "" {
		in.BaseRelease = d.BaseRelease
	}
	return d.RoundService.Create(ctx, in)
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
