package logging

import (
	"bytes"
	"encoding/json"
	"testing"
)

// TestNew_JSONInfo verifies that an Info record is written as one JSON object
// carrying the message and the upper-case level name.
func TestNew_JSONInfo(t *testing.T) {
	var buf bytes.Buffer
	logger, err := New(&buf, "info")
	if err != nil {
		t.Fatalf("New(info) returned error: %v", err)
	}

	logger.Info("hello")

	var record map[string]any
	if err := json.Unmarshal(buf.Bytes(), &record); err != nil {
		t.Fatalf("output is not a single JSON object: %v (output=%q)", err, buf.String())
	}
	if got := record["msg"]; got != "hello" {
		t.Errorf("msg = %v, want %q", got, "hello")
	}
	if got := record["level"]; got != "INFO" {
		t.Errorf("level = %v, want %q", got, "INFO")
	}
}

// TestNew_LevelFilterAndUnknown verifies that records below the configured
// level are dropped and that an unrecognised level is rejected.
func TestNew_LevelFilterAndUnknown(t *testing.T) {
	var buf bytes.Buffer
	logger, err := New(&buf, "warn")
	if err != nil {
		t.Fatalf("New(warn) returned error: %v", err)
	}

	logger.Info("x")
	if buf.Len() != 0 {
		t.Errorf("info record written at warn level: %q", buf.String())
	}

	if _, err := New(&buf, "loud"); err == nil {
		t.Error("New(loud) returned nil error, want unknown-level error")
	}
}
