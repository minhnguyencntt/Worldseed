// Package gitrepo commits contributions to a Git repository through the git CLI.
// Bot credentials are passed to git as -c arguments and never leave the backend.
package gitrepo

import (
	"context"
	"errors"
	"fmt"
	"os/exec"
	"path/filepath"
	"strings"
)

// Committer records a set of repository-relative paths as a single commit.
type Committer interface {
	Commit(ctx context.Context, paths []string, message string) error
}

// Runner executes git with args inside dir and returns its combined output.
type Runner func(ctx context.Context, dir string, args ...string) ([]byte, error)

// defaultRunner runs the system git binary in dir.
func defaultRunner(ctx context.Context, dir string, args ...string) ([]byte, error) {
	cmd := exec.CommandContext(ctx, "git", args...)
	cmd.Dir = dir
	return cmd.CombinedOutput()
}

// CLI implements Committer by shelling out to git.
type CLI struct {
	Dir      string
	BotName  string
	BotEmail string
	Run      Runner
}

var _ Committer = (*CLI)(nil)

// ErrInvalidPath is returned when no paths are given or a path is absolute or contains "..".
var ErrInvalidPath = errors.New("gitrepo: invalid path")

// Commit stages paths and commits only those paths with the bot identity.
// It runs `git add -- paths...` and then `git -c user.name=... -c user.email=... commit -m message -- paths...`,
// returning the first failure.
func (c *CLI) Commit(ctx context.Context, paths []string, message string) error {
	if len(paths) == 0 {
		return fmt.Errorf("%w: no paths given", ErrInvalidPath)
	}
	for _, p := range paths {
		if filepath.IsAbs(p) || strings.HasPrefix(p, "/") || strings.Contains(p, "..") {
			return fmt.Errorf("%w: %q", ErrInvalidPath, p)
		}
	}

	run := c.Run
	if run == nil {
		run = defaultRunner
	}

	addArgs := append([]string{"add", "--"}, paths...)
	if out, err := run(ctx, c.Dir, addArgs...); err != nil {
		return commandError("add", err, out)
	}

	commitArgs := append([]string{
		"-c", "user.name=" + c.BotName,
		"-c", "user.email=" + c.BotEmail,
		"commit", "-m", message, "--",
	}, paths...)
	if out, err := run(ctx, c.Dir, commitArgs...); err != nil {
		return commandError("commit", err, out)
	}
	return nil
}

// commandError wraps a failed git invocation with its subcommand name and trimmed output.
func commandError(name string, err error, out []byte) error {
	if msg := strings.TrimSpace(string(out)); msg != "" {
		return fmt.Errorf("gitrepo: git %s: %w: %s", name, err, msg)
	}
	return fmt.Errorf("gitrepo: git %s: %w", name, err)
}
