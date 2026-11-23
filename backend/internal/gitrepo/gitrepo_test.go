package gitrepo

import (
	"context"
	"errors"
	"strings"
	"testing"
)

// fakeRunner records every git invocation and returns the configured error for matching subcommands.
type fakeRunner struct {
	calls   [][]string
	failOn  string
	failErr error
}

func (f *fakeRunner) run(_ context.Context, _ string, args ...string) ([]byte, error) {
	f.calls = append(f.calls, append([]string(nil), args...))
	if f.failOn != "" && len(args) > 0 && args[0] == f.failOn {
		return []byte("boom"), f.failErr
	}
	return nil, nil
}

// Given a CLI committer with a fake runner, when Commit is called with one path,
// then git add runs first for that path and the commit runs with the bot identity and message.
func TestCommit_RunsAddThenCommit(t *testing.T) {
	fake := &fakeRunner{}
	c := &CLI{Dir: "/repo", BotName: "bot", BotEmail: "bot@x", Run: fake.run}

	if err := c.Commit(context.Background(), []string{"worlds/a.md"}, "msg"); err != nil {
		t.Fatalf("Commit returned error: %v", err)
	}

	if len(fake.calls) != 2 {
		t.Fatalf("expected 2 git calls, got %d: %v", len(fake.calls), fake.calls)
	}

	wantAdd := []string{"add", "--", "worlds/a.md"}
	if strings.Join(fake.calls[0], " ") != strings.Join(wantAdd, " ") {
		t.Errorf("add call = %v, want %v", fake.calls[0], wantAdd)
	}

	commit := strings.Join(fake.calls[1], " ")
	for _, want := range []string{"user.name=bot", "user.email=bot@x", "commit", "-m msg"} {
		if !strings.Contains(commit, want) {
			t.Errorf("commit call %q missing %q", commit, want)
		}
	}
}

// Given git add fails, when Commit is called,
// then Commit returns an error and never runs the commit step.
func TestCommit_AddFailureSkipsCommit(t *testing.T) {
	fake := &fakeRunner{failOn: "add", failErr: errors.New("exit status 128")}
	c := &CLI{Dir: "/repo", BotName: "bot", BotEmail: "bot@x", Run: fake.run}

	err := c.Commit(context.Background(), []string{"worlds/a.md"}, "msg")
	if err == nil {
		t.Fatal("expected error when git add fails, got nil")
	}

	if len(fake.calls) != 1 {
		t.Fatalf("expected only the add call, got %d calls: %v", len(fake.calls), fake.calls)
	}
}

// Given paths that are empty, parent-relative, or absolute, when Commit is called,
// then Commit rejects each with ErrInvalidPath and runs no git commands.
func TestCommit_RejectsBadPaths(t *testing.T) {
	cases := []struct {
		name  string
		paths []string
	}{
		{name: "empty slice", paths: []string{}},
		{name: "parent-relative path", paths: []string{"../x"}},
		{name: "absolute path", paths: []string{"/abs"}},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			fake := &fakeRunner{}
			c := &CLI{Dir: "/repo", BotName: "bot", BotEmail: "bot@x", Run: fake.run}

			err := c.Commit(context.Background(), tc.paths, "msg")
			if err == nil {
				t.Fatalf("expected error for paths %v, got nil", tc.paths)
			}
			if !errors.Is(err, ErrInvalidPath) {
				t.Errorf("error = %v, want ErrInvalidPath", err)
			}
			if len(fake.calls) != 0 {
				t.Errorf("expected zero git calls, got %v", fake.calls)
			}
		})
	}
}
