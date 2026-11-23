// Package recovery releases stale execution locks and restarts interrupted
// executions on worker startup.
package recovery

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"time"
)

// LockFS abstracts the filesystem operations needed to inspect and remove the
// execution lock file, so stale-lock handling can be exercised without touching
// the real disk.
type LockFS interface {
	ModTime(path string) (time.Time, error)
	Remove(path string) error
}

// OSLockFS is the LockFS implementation backed by the operating system.
type OSLockFS struct{}

// ModTime returns the modification time of the file at p.
func (OSLockFS) ModTime(p string) (time.Time, error) {
	fi, err := os.Stat(p)
	if err != nil {
		return time.Time{}, err
	}
	return fi.ModTime(), nil
}

// Remove deletes the file at p.
func (OSLockFS) Remove(p string) error {
	return os.Remove(p)
}

// Compile-time check that OSLockFS satisfies LockFS.
var _ LockFS = OSLockFS{}

// Startup runs once when the worker starts. If the configured lock file is
// stale (its modification time is older than Config.StaleAfter before the
// Recoverer clock) it is removed and Result.LockReleased is set. A missing or
// fresh lock is left alone. A failure to remove the stale lock is returned
// before any execution is resumed. Afterwards the interrupted executions are
// recovered as by Recover.
func (r *Recoverer) Startup(ctx context.Context) (Result, error) {
	released, err := r.releaseStaleLock()
	if err != nil {
		return Result{}, fmt.Errorf("recovery: startup: %w", err)
	}

	res, err := r.Recover(ctx)
	res.LockReleased = released
	return res, err
}

// releaseStaleLock removes the lock file at Config.LockPath when it is stale.
// It reports whether a lock was removed.
func (r *Recoverer) releaseStaleLock() (bool, error) {
	mod, err := r.lockFS.ModTime(r.cfg.LockPath)
	if errors.Is(err, fs.ErrNotExist) {
		return false, nil
	}
	if err != nil {
		return false, fmt.Errorf("stat lock %s: %w", r.cfg.LockPath, err)
	}
	if r.now().Sub(mod) <= r.cfg.StaleAfter {
		return false, nil
	}
	if err := r.lockFS.Remove(r.cfg.LockPath); err != nil {
		return false, fmt.Errorf("remove stale lock %s: %w", r.cfg.LockPath, err)
	}
	return true, nil
}
