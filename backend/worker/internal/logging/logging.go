// Package logging provides the JSON slog logger factory used by the worker.
package logging

import (
	"fmt"
	"io"
	"log/slog"
	"strings"
)

// New returns a JSON slog logger writing to w at the given level.
// Accepted levels (case-insensitive): debug, info, warn, error.
func New(w io.Writer, level string) (*slog.Logger, error) {
	var lvl slog.Level
	switch strings.ToLower(level) {
	case "debug":
		lvl = slog.LevelDebug
	case "info":
		lvl = slog.LevelInfo
	case "warn":
		lvl = slog.LevelWarn
	case "error":
		lvl = slog.LevelError
	default:
		return nil, fmt.Errorf("logging: unknown level %q", level)
	}
	return slog.New(slog.NewJSONHandler(w, &slog.HandlerOptions{Level: lvl})), nil
}
