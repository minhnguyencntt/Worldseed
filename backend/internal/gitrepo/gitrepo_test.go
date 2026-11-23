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

// Given a runner whose rev-parse HEAD prints a SHA with a trailing newline,
// when Head is called,
// then it returns the trimmed SHA and runs exactly `git rev-parse HEAD` in the repository directory.
func TestHead_ReturnsTrimmedSHA(t *testing.T) {
	var gotDir string
	var gotArgs []string
	run := func(_ context.Context, dir string, args ...string) ([]byte, error) {
		gotDir = dir
		gotArgs = append([]string(nil), args...)
		return []byte("deadbeef\n"), nil
	}
	c := &CLI{Dir: "/repo", Run: run}

	got, err := c.Head(context.Background())
	if err != nil {
		t.Fatalf("Head returned error: %v", err)
	}
	if got != "deadbeef" {
		t.Errorf("Head = %q, want %q", got, "deadbeef")
	}
	if strings.Join(gotArgs, " ") != "rev-parse HEAD" {
		t.Errorf("git args = %v, want [rev-parse HEAD]", gotArgs)
	}
	if gotDir != "/repo" {
		t.Errorf("git dir = %q, want /repo", gotDir)
	}
}

// Given a runner whose rev-parse HEAD fails,
// when Head is called,
// then it returns an error wrapping the runner error and no SHA.
func TestHead_ReturnsRunnerError(t *testing.T) {
	failErr := errors.New("exit status 128")
	run := func(_ context.Context, _ string, _ ...string) ([]byte, error) {
		return []byte("fatal: not a git repository"), failErr
	}
	c := &CLI{Dir: "/repo", Run: run}

	got, err := c.Head(context.Background())
	if err == nil {
		t.Fatalf("Head error = nil, want error (got sha %q)", got)
	}
	if !errors.Is(err, failErr) {
		t.Errorf("Head error = %v, want it to wrap %v", err, failErr)
	}
	if got != "" {
		t.Errorf("Head sha = %q on failure, want empty", got)
	}
}
