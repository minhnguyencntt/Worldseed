// Package provider adapts external AI coding agents to the worker runner.
package provider

import (
	"context"
	"fmt"
	"strings"
)

// claudePrompt is the fixed instruction given to the Claude CLI. It asks the
// agent to implement the structured tasks found in development/tasks.
const claudePrompt = "Implement the structured tasks in development/tasks."

// claudeArgs returns the Claude CLI flags. It runs the fixed prompt in
// non-interactive mode, auto-accepts edits, allows only file tools, and
// disallows shell and web access.
func claudeArgs() []string {
	return []string{"-p", claudePrompt, "--permission-mode", "acceptEdits", "--allowedTools", "Read,Edit,Write,Glob,Grep", "--disallowedTools", "Bash,WebFetch,WebSearch"}
}

// Exec runs a command named name with args inside dir and returns its error.
type Exec interface {
	Run(ctx context.Context, dir, name string, args []string) error
}

// Claude runs the Claude CLI through an Exec.
type Claude struct {
	exec Exec
}

// NewClaude returns a Claude adapter that runs commands through e.
// It returns an error when e is nil.
func NewClaude(e Exec) (*Claude, error) {
	if e == nil {
		return nil, fmt.Errorf("provider claude: exec is nil")
	}
	return &Claude{exec: e}, nil
}

// Run executes the Claude CLI in workDir with the fixed prompt. The adapter
// does not measure cost, so it always returns 0 as the cost.
func (c *Claude) Run(ctx context.Context, workDir string) (float64, error) {
	if strings.TrimSpace(workDir) == "" {
		return 0, fmt.Errorf("provider claude: work dir is empty")
	}
	if err := c.exec.Run(ctx, workDir, "claude", claudeArgs()); err != nil {
		return 0, fmt.Errorf("provider claude: %w", err)
	}
	return 0, nil
}
