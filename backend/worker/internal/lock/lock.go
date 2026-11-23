// Package lock provides an exclusive, file-based lock used to serialize
// work on a single per-World resource.
package lock

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strconv"
)

// ErrLocked is returned by Acquire when the lock file already exists.
var ErrLocked = errors.New("lock: already held")

// Lock is a handle to an acquired exclusive file lock.
type Lock struct {
	path     string
	released bool
}

// Acquire atomically creates the lock file at path and records the owning
// process ID in it. If the file already exists, it returns an error wrapping
// ErrLocked.
func Acquire(path string) (*Lock, error) {
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return nil, fmt.Errorf("lock: create directory for %s: %w", path, err)
	}

	f, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0o600)
	if err != nil {
		if errors.Is(err, fs.ErrExist) {
			return nil, fmt.Errorf("%w: %s", ErrLocked, path)
		}
		return nil, fmt.Errorf("lock: create %s: %w", path, err)
	}

	if _, err := f.WriteString(strconv.Itoa(os.Getpid())); err != nil {
		_ = f.Close()
		_ = os.Remove(path)
		return nil, fmt.Errorf("lock: write pid to %s: %w", path, err)
	}
	if err := f.Close(); err != nil {
		_ = os.Remove(path)
		return nil, fmt.Errorf("lock: close %s: %w", path, err)
	}

	return &Lock{path: path}, nil
}

// Release removes the lock file. Calling Release more than once is a no-op.
func (l *Lock) Release() error {
	if l.released {
		return nil
	}
	if err := os.Remove(l.path); err != nil {
		return fmt.Errorf("lock: release %s: %w", l.path, err)
	}
	l.released = true
	return nil
}
