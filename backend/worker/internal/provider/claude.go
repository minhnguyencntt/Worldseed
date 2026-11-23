// Package provider adapts external AI coding agents to the worker runner.
package provider

import (
	"context"
	"fmt"
)

// claudePrompt is the fixed instruction given to the Claude CLI. It asks the
// agent to implement the structured tasks found in development/tasks.
const claudePrompt = "Implement the structured tasks in development/tasks."

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
	if err := c.exec.Run(ctx, workDir, "claude", []string{"-p", claudePrompt}); err != nil {
		return 0, fmt.Errorf("provider claude: %w", err)
	}
	return 0, nil
}
