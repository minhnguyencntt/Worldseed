// Command server runs the StoryForge backend HTTP API.
package main

import (
	"flag"
	"log/slog"
	"net/http"
	"os"

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

	logger.Info("starting server", "addr", cfg.Server.Addr)
	if err := http.ListenAndServe(cfg.Server.Addr, server.New(cfg, logger)); err != nil {
		logger.Error("server stopped", "err", err)
		os.Exit(1)
	}
}
