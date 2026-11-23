// Package gitrepo defines the Git operations the backend needs from the GitOps repository.
package gitrepo

import "context"

// Committer records a set of repository files as a single commit.
// paths are relative to the repository root.
type Committer interface {
	Commit(ctx context.Context, paths []string, message string) error
}
