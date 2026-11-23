package provider

import (
	"context"
	"errors"
	"strings"
	"testing"
)

// errBoom is the error returned by a failing recordingExec.
var errBoom = errors.New("boom")

// recordingExec is a fake Exec. It records the single call it receives and
// returns err without running any command.
type recordingExec struct {
	err error

	called bool
	dir    string
	name   string
	args   []string
}

func (f *recordingExec) Run(ctx context.Context, dir, name string, args []string) error {
	f.called = true
	f.dir = dir
	f.name = name
	f.args = args
	return f.err
}

// Given a Claude adapter backed by a fake Exec, when Run is called with a work
// directory, then the Exec is called once with the claude command in that
// directory with a non-empty argument list, and the reported cost is 0.
func TestClaudeRunCallsExec(t *testing.T) {
	const workDir = "/tmp/case-work-dir"
	fake := &recordingExec{}

	c, err := NewClaude(fake)
	if err != nil {
		t.Fatalf("NewClaude returned error: %v", err)
	}

	cost, err := c.Run(context.Background(), workDir)
	if err != nil {
		t.Fatalf("Run returned error: %v", err)
	}

	if !fake.called {
		t.Fatal("Run did not call Exec")
	}
	if fake.name != "claude" {
		t.Errorf("Exec name = %q, want %q", fake.name, "claude")
	}
	if fake.dir != workDir {
		t.Errorf("Exec dir = %q, want %q", fake.dir, workDir)
	}
	if len(fake.args) == 0 {
		t.Error("Exec args is empty, want the claude prompt arguments")
	}
	if cost != 0 {
		t.Errorf("Run cost = %v, want 0", cost)
	}
}

// Given the fake Exec fails with errBoom, when Run is called, then Run returns
// an error that wraps errBoom and names the claude provider, and the cost is 0.
func TestClaudeRunWrapsError(t *testing.T) {
	fake := &recordingExec{err: errBoom}

	c, err := NewClaude(fake)
	if err != nil {
		t.Fatalf("NewClaude returned error: %v", err)
	}

	cost, err := c.Run(context.Background(), "/tmp/case-work-dir")
	if err == nil {
		t.Fatal("Run returned nil error, want error wrapping errBoom")
	}
	if !errors.Is(err, errBoom) {
		t.Errorf("Run error = %v, want it to wrap errBoom", err)
	}
	if !strings.Contains(err.Error(), "claude") {
		t.Errorf("Run error = %q, want it to contain %q", err.Error(), "claude")
	}
	if cost != 0 {
		t.Errorf("Run cost = %v, want 0 on error", cost)
	}
}

// Given a nil Exec, when NewClaude is called, then it returns an error and no
// adapter.
func TestNewClaudeNilExec(t *testing.T) {
	c, err := NewClaude(nil)
	if err == nil {
		t.Fatal("NewClaude(nil) returned nil error, want error")
	}
	if c != nil {
		t.Errorf("NewClaude(nil) returned adapter %v alongside error", c)
	}
}
