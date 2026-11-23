package lock

import (
	"errors"
	"path/filepath"
	"testing"
)

// TestAcquire_Exclusive verifies that a lock file can be held by only one
// owner at a time: when a lock is already held, a second Acquire on the same
// path fails with ErrLocked.
func TestAcquire_Exclusive(t *testing.T) {
	p := filepath.Join(t.TempDir(), "w.lock")

	l, err := Acquire(p)
	if err != nil {
		t.Fatalf("first Acquire(%q) returned error: %v", p, err)
	}
	t.Cleanup(func() { _ = l.Release() })

	_, err = Acquire(p)
	if err == nil {
		t.Fatalf("second Acquire(%q) succeeded; want ErrLocked", p)
	}
	if !errors.Is(err, ErrLocked) {
		t.Fatalf("second Acquire(%q) error = %v; want errors.Is(err, ErrLocked)", p, err)
	}
}

// TestRelease_AllowsReacquire verifies that releasing a lock frees the path
// for a new owner, that a repeated Release is a no-op, and that the lock can
// be acquired again afterwards.
func TestRelease_AllowsReacquire(t *testing.T) {
	p := filepath.Join(t.TempDir(), "w.lock")

	l, err := Acquire(p)
	if err != nil {
		t.Fatalf("first Acquire(%q) returned error: %v", p, err)
	}
	if err := l.Release(); err != nil {
		t.Fatalf("first Release() returned error: %v", err)
	}
	if err := l.Release(); err != nil {
		t.Fatalf("second Release() returned error: %v; want nil", err)
	}

	l2, err := Acquire(p)
	if err != nil {
		t.Fatalf("Acquire(%q) after Release returned error: %v", p, err)
	}
	t.Cleanup(func() { _ = l2.Release() })
}
