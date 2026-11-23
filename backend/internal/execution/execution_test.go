package execution

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"reflect"
	"testing"
	"time"
)

// fakeCommitter records every Commit call instead of running git.
type fakeCommitter struct {
	calls [][]string
	err   error
}

func (f *fakeCommitter) Commit(_ context.Context, paths []string, _ string) error {
	f.calls = append(f.calls, append([]string(nil), paths...))
	return f.err
}

var fixedNow = time.Date(2026, 11, 23, 10, 0, 0, 0, time.UTC)

const failedYAML = `id: EXE-1
world_id: W-1
round_id: R-1
status: FAILED
error: boom
updated_at: 2026-11-01T00:00:00Z
`

const awaitingYAML = `id: EXE-2
world_id: W-1
round_id: R-1
status: AWAITING_APPROVAL
error: ""
updated_at: 2026-11-01T00:00:00Z
`

// newStore writes the given execution files under a fresh temp root and returns a store on it.
func newStore(t *testing.T, git *fakeCommitter, files map[string]string) (*FileStore, string) {
	t.Helper()
	root := t.TempDir()
	dir := filepath.Join(root, executionsDir)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		t.Fatalf("mkdir: %v", err)
	}
	for name, body := range files {
		if err := os.WriteFile(filepath.Join(dir, name), []byte(body), 0o644); err != nil {
			t.Fatalf("write %s: %v", name, err)
		}
	}
	return &FileStore{Root: root, Git: git, Now: func() time.Time { return fixedNow }}, root
}

// Given a FAILED and an AWAITING_APPROVAL execution, the store applies only legal transitions.
func TestRetry(t *testing.T) {
	t.Parallel()

	t.Run("Given a FAILED execution, When Retry is called, Then it is QUEUED with the error cleared, persisted and committed", func(t *testing.T) {
		git := &fakeCommitter{}
		s, _ := newStore(t, git, map[string]string{"EXE-1.yaml": failedYAML})

		ex, err := s.Retry(context.Background(), "EXE-1")
		if err != nil {
			t.Fatalf("Retry(EXE-1): %v", err)
		}
		if ex.Status != StatusQueued || ex.Error != "" {
			t.Fatalf("returned execution = status %s error %q, want QUEUED and empty error", ex.Status, ex.Error)
		}
		if !ex.UpdatedAt.Equal(fixedNow) {
			t.Errorf("UpdatedAt = %v, want %v", ex.UpdatedAt, fixedNow)
		}

		got, err := s.Get(context.Background(), "EXE-1")
		if err != nil {
			t.Fatalf("Get after Retry: %v", err)
		}
		if got.Status != StatusQueued {
			t.Errorf("persisted status = %s, want QUEUED", got.Status)
		}

		want := [][]string{{"development/executions/EXE-1.yaml"}}
		if !reflect.DeepEqual(git.calls, want) {
			t.Errorf("committed paths = %v, want %v", git.calls, want)
		}
	})

	t.Run("Given an AWAITING_APPROVAL execution, When Retry is called, Then it returns ErrIllegalState and nothing is committed", func(t *testing.T) {
		git := &fakeCommitter{}
		s, _ := newStore(t, git, map[string]string{"EXE-2.yaml": awaitingYAML})

		_, err := s.Retry(context.Background(), "EXE-2")
		if !errors.Is(err, ErrIllegalState) {
			t.Fatalf("Retry(EXE-2) err = %v, want ErrIllegalState", err)
		}
		if len(git.calls) != 0 {
			t.Errorf("commits = %v, want none", git.calls)
		}
	})
}

// Given an AWAITING_APPROVAL execution, Approve moves it to APPROVED; unsafe IDs never touch disk.
func TestApprove(t *testing.T) {
	t.Parallel()

	t.Run("Given an AWAITING_APPROVAL execution, When Approve is called, Then it is APPROVED, persisted and committed", func(t *testing.T) {
		git := &fakeCommitter{}
		s, _ := newStore(t, git, map[string]string{"EXE-2.yaml": awaitingYAML})

		ex, err := s.Approve(context.Background(), "EXE-2")
		if err != nil {
			t.Fatalf("Approve(EXE-2): %v", err)
		}
		if ex.Status != StatusApproved {
			t.Fatalf("returned status = %s, want APPROVED", ex.Status)
		}

		got, err := s.Get(context.Background(), "EXE-2")
		if err != nil {
			t.Fatalf("Get after Approve: %v", err)
		}
		if got.Status != StatusApproved {
			t.Errorf("persisted status = %s, want APPROVED", got.Status)
		}
		want := [][]string{{"development/executions/EXE-2.yaml"}}
		if !reflect.DeepEqual(git.calls, want) {
			t.Errorf("committed paths = %v, want %v", git.calls, want)
		}
	})

	t.Run("Given an unsafe ID, When Approve is called, Then it returns ErrNotFound and writes nothing", func(t *testing.T) {
		git := &fakeCommitter{}
		s, root := newStore(t, git, map[string]string{"EXE-2.yaml": awaitingYAML})

		_, err := s.Approve(context.Background(), "../x")
		if !errors.Is(err, ErrNotFound) {
			t.Fatalf("Approve(../x) err = %v, want ErrNotFound", err)
		}
		if _, statErr := os.Stat(filepath.Join(root, "x.yaml")); !errors.Is(statErr, os.ErrNotExist) {
			t.Errorf("unexpected file outside executions dir: stat err = %v", statErr)
		}
		if len(git.calls) != 0 {
			t.Errorf("commits = %v, want none", git.calls)
		}
	})
}

// Given two execution files, List returns both sorted by ID.
func TestList(t *testing.T) {
	t.Parallel()

	t.Run("Given two execution files, When List is called, Then both are returned sorted by ID", func(t *testing.T) {
		s, _ := newStore(t, &fakeCommitter{}, map[string]string{
			"EXE-2.yaml": awaitingYAML,
			"EXE-1.yaml": failedYAML,
		})

		list, err := s.List(context.Background())
		if err != nil {
			t.Fatalf("List: %v", err)
		}
		if len(list) != 2 {
			t.Fatalf("len(list) = %d, want 2", len(list))
		}
		if list[0].ID != "EXE-1" || list[1].ID != "EXE-2" {
			t.Errorf("IDs = [%s %s], want [EXE-1 EXE-2]", list[0].ID, list[1].ID)
		}
	})

	t.Run("Given no executions directory, When List is called, Then it returns an empty non-nil slice", func(t *testing.T) {
		s := &FileStore{Root: t.TempDir(), Git: &fakeCommitter{}}

		list, err := s.List(context.Background())
		if err != nil {
			t.Fatalf("List: %v", err)
		}
		if list == nil || len(list) != 0 {
			t.Errorf("list = %#v, want empty non-nil slice", list)
		}
	})
}
