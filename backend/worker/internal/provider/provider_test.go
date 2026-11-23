package provider

import (
	"context"
	"strings"
	"testing"
)

// fakeExec is a test double for Exec. It records nothing and never runs a command.
type fakeExec struct{}

func (fakeExec) Run(ctx context.Context, dir, name string, args []string) error {
	return nil
}

// Given the factory is asked for a known kind, when New is called,
// then it returns the matching Agent implementation, and an unknown kind
// or a missing exec for claude returns an error.
func TestNew(t *testing.T) {
	tests := []struct {
		name    string
		kind    string
		exec    Exec
		check   func(t *testing.T, a Agent)
		wantErr string
	}{
		{
			name: "mock kind returns Mock agent",
			kind: "mock",
			exec: nil,
			check: func(t *testing.T, a Agent) {
				t.Helper()
				if _, ok := a.(Mock); !ok {
					t.Fatalf("New(\"mock\") returned %T, want Mock", a)
				}
			},
		},
		{
			name: "claude kind with exec returns *Claude agent",
			kind: "claude",
			exec: &fakeExec{},
			check: func(t *testing.T, a Agent) {
				t.Helper()
				if _, ok := a.(*Claude); !ok {
					t.Fatalf("New(\"claude\") returned %T, want *Claude", a)
				}
			},
		},
		{
			name:    "unknown kind returns error naming the kind",
			kind:    "gpt",
			exec:    nil,
			wantErr: "gpt",
		},
		{
			name:    "claude kind without exec returns error",
			kind:    "claude",
			exec:    nil,
			wantErr: "exec is nil",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			a, err := New(tc.kind, tc.exec)
			if tc.wantErr != "" {
				if err == nil {
					t.Fatalf("New(%q) returned nil error, want error containing %q", tc.kind, tc.wantErr)
				}
				if !strings.Contains(err.Error(), tc.wantErr) {
					t.Fatalf("New(%q) error = %q, want it to contain %q", tc.kind, err.Error(), tc.wantErr)
				}
				if a != nil {
					t.Fatalf("New(%q) returned agent %T alongside error", tc.kind, a)
				}
				return
			}
			if err != nil {
				t.Fatalf("New(%q) returned error: %v", tc.kind, err)
			}
			tc.check(t, a)
		})
	}
}
