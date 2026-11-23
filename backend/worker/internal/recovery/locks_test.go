package recovery

import (
	"context"
	"errors"
	"io/fs"
	"reflect"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// fakeLockFS is an in-memory LockFS. It reports a fixed modification time (or
// modErr), records every Remove call and can be told to fail Remove. The real
// filesystem is never touched.
type fakeLockFS struct {
	modTime   time.Time
	modErr    error
	removeErr error
	removed   []string
}

func (f *fakeLockFS) ModTime(string) (time.Time, error) {
	if f.modErr != nil {
		return time.Time{}, f.modErr
	}
	return f.modTime, nil
}

func (f *fakeLockFS) Remove(p string) error {
	f.removed = append(f.removed, p)
	return f.removeErr
}

// Given a lock file last modified two hours before the fixed clock and a
// StaleAfter of one hour,
// When Startup runs with one RUNNING execution in the store,
// Then the lock is removed, Result.LockReleased is true and the execution is resumed.
func TestStartupReleasesStaleLock(t *testing.T) {
	now := fixedClock()()
	lfs := &fakeLockFS{modTime: now.Add(-2 * time.Hour)}
	fs := &fakeStore{list: []store.Execution{
		{ID: "run-1", Status: store.StatusRunning},
	}}
	fr := &fakeResumer{}
	cfg := Config{LockPath: "w/lock", StaleAfter: time.Hour}

	res, err := New(cfg, fs, fr, lfs, fixedClock()).Startup(context.Background())
	if err != nil {
		t.Fatalf("Startup returned error: %v", err)
	}
	if want := []string{"w/lock"}; !reflect.DeepEqual(lfs.removed, want) {
		t.Errorf("removed = %v, want %v", lfs.removed, want)
	}
	if !res.LockReleased {
		t.Errorf("Result.LockReleased = false, want true")
	}
	if want := []string{"run-1"}; !reflect.DeepEqual(fr.ids, want) {
		t.Errorf("resumed IDs = %v, want %v", fr.ids, want)
	}
	if want := []string{"run-1"}; !reflect.DeepEqual(res.Resumed, want) {
		t.Errorf("Result.Resumed = %v, want %v", res.Resumed, want)
	}
}

// Given the lock file is either fresh (modified ten minutes ago) or missing
// (ModTime reports fs.ErrNotExist),
// When Startup runs,
// Then no lock is removed, Result.LockReleased is false and no error is returned.
func TestStartupKeepsFreshOrMissingLock(t *testing.T) {
	now := fixedClock()()
	tests := []struct {
		name string
		lfs  *fakeLockFS
	}{
		{
			name: "fresh lock modified ten minutes ago is kept",
			lfs:  &fakeLockFS{modTime: now.Add(-10 * time.Minute)},
		},
		{
			name: "missing lock file is treated as no lock",
			lfs:  &fakeLockFS{modErr: fs.ErrNotExist},
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			fr := &fakeResumer{}
			cfg := Config{LockPath: "w/lock", StaleAfter: time.Hour}

			res, err := New(cfg, &fakeStore{}, fr, tc.lfs, fixedClock()).Startup(context.Background())
			if err != nil {
				t.Fatalf("Startup returned error: %v", err)
			}
			if len(tc.lfs.removed) != 0 {
				t.Errorf("removed = %v, want none", tc.lfs.removed)
			}
			if res.LockReleased {
				t.Errorf("Result.LockReleased = true, want false")
			}
		})
	}
}

// Given a stale lock whose Remove fails with a permission error and one
// RUNNING execution in the store,
// When Startup runs,
// Then the remove error is returned (errors.Is matches it) and no execution is resumed.
func TestStartupRemoveFailureStopsRecovery(t *testing.T) {
	now := fixedClock()()
	removeErr := errors.New("perm")
	lfs := &fakeLockFS{modTime: now.Add(-2 * time.Hour), removeErr: removeErr}
	fs := &fakeStore{list: []store.Execution{
		{ID: "run-1", Status: store.StatusRunning},
	}}
	fr := &fakeResumer{}
	cfg := Config{LockPath: "w/lock", StaleAfter: time.Hour}

	_, err := New(cfg, fs, fr, lfs, fixedClock()).Startup(context.Background())
	if !errors.Is(err, removeErr) {
		t.Fatalf("Startup error = %v, want wrapping %v", err, removeErr)
	}
	if len(fr.ids) != 0 {
		t.Errorf("resumer recorded IDs %v, want none", fr.ids)
	}
}
