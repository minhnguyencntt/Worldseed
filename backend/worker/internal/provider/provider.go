// Package provider selects the agent implementation the worker runs for an
// Execution, based on the configured provider kind.
package provider

import (
	"context"
	"fmt"
)

// Agent performs the work for one execution inside workDir and reports its cost.
type Agent interface {
	Run(ctx context.Context, workDir string) (float64, error)
}

// New returns the Agent for kind: "mock" or "claude". Any other kind is an error.
func New(kind string, e Exec) (Agent, error) {
	switch kind {
	case "mock":
		return Mock{}, nil
	case "claude":
		c, err := NewClaude(e)
		if err != nil {
			return nil, err
		}
		return c, nil
	default:
		return nil, fmt.Errorf("provider: unknown kind %q", kind)
	}
}
