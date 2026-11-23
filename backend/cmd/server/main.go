// Command server runs the StoryForge backend HTTP API.
package main

import (
	"context"
	"errors"
	"flag"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/worldseed/storyforge/backend/internal/config"
	"github.com/worldseed/storyforge/backend/internal/server"
)

func main() {
	cfgPath := flag.String("config", "configs/config.example.yaml", "path to YAML config")
	flag.Parse()

	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	cfg, err := config.Load(*cfgPath)
	if err != nil {
		logger.Error("load config", "path", *cfgPath, "err", err)
		os.Exit(1)
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	go server.NewScheduler(cfg).Run(ctx)

	// NotifyContext swallows the interrupt, so shut the HTTP server down on it
	// to keep Ctrl-C and SIGTERM exiting the process.
	srv := &http.Server{Addr: cfg.Server.Addr, Handler: server.New(cfg, logger)}
	go func() {
		<-ctx.Done()
		_ = srv.Shutdown(context.Background())
	}()

	logger.Info("starting server", "addr", cfg.Server.Addr)
	if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		logger.Error("server stopped", "err", err)
		os.Exit(1)
	}
}
