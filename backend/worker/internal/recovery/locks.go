// Package recovery releases stale execution locks and restarts interrupted
// executions on worker startup.
package recovery

import (
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
