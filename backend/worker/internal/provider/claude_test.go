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

// Given a Claude adapter backed by a fake Exec, when Run is called with a blank
// work directory, then Run returns an error naming the work dir, Exec is never
// called, and the cost is 0.
func TestClaudeRunRejectsEmptyWorkDir(t *testing.T) {
	fake := &recordingExec{}

	c, err := NewClaude(fake)
	if err != nil {
		t.Fatalf("NewClaude returned error: %v", err)
	}

	cost, err := c.Run(context.Background(), "  ")
	if err == nil {
		t.Fatal("Run returned nil error, want error for empty work dir")
	}
	if !strings.Contains(err.Error(), "work dir") {
		t.Errorf("Run error = %q, want it to contain %q", err.Error(), "work dir")
	}
	if fake.called {
		t.Error("Run called Exec for an empty work dir, want Exec not called")
	}
	if cost != 0 {
		t.Errorf("Run cost = %v, want 0", cost)
	}
}

// Given a Claude adapter backed by a fake Exec, when Run is called with a work
// directory, then the argument after -p is the fixed claudePrompt and no
// argument contains the work directory path.
func TestClaudeRunUsesFixedPrompt(t *testing.T) {
	const workDir = "/tmp/secret-dir"
	fake := &recordingExec{}

	c, err := NewClaude(fake)
	if err != nil {
		t.Fatalf("NewClaude returned error: %v", err)
	}

	if _, err := c.Run(context.Background(), workDir); err != nil {
		t.Fatalf("Run returned error: %v", err)
	}

	if !fake.called {
		t.Fatal("Run did not call Exec")
	}

	promptIdx := -1
	for i, a := range fake.args {
		if a == "-p" && i+1 < len(fake.args) {
			promptIdx = i + 1
			break
		}
	}
	if promptIdx < 0 {
		t.Fatalf("Exec args = %v, want a -p flag followed by a prompt", fake.args)
	}
	if fake.args[promptIdx] != claudePrompt {
		t.Errorf("prompt arg = %q, want %q", fake.args[promptIdx], claudePrompt)
	}
	for _, a := range fake.args {
		if strings.Contains(a, "secret-dir") {
			t.Errorf("Exec arg %q contains work dir path, want the prompt to be fixed", a)
		}
	}
}
