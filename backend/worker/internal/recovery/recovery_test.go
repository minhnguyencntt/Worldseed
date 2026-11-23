package recovery

import (
	"context"
	"errors"
	"reflect"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// fakeStore is an in-memory ExecutionStore. It records every Save call and can
// be told to fail List.
type fakeStore struct {
	list    []store.Execution
	saved   []store.Execution
	listErr error
}

func (f *fakeStore) List() ([]store.Execution, error) {
	if f.listErr != nil {
		return nil, f.listErr
	}
	return f.list, nil
}

func (f *fakeStore) Save(e store.Execution) error {
	f.saved = append(f.saved, e)
	return nil
}

// fakeResumer is an in-memory Resumer. It records the IDs it was asked to
// resume, in call order, and returns errFor[id] when set.
type fakeResumer struct {
	ids    []string
	errFor map[string]error
}

func (f *fakeResumer) Resume(_ context.Context, e store.Execution) error {
	f.ids = append(f.ids, e.ID)
	return f.errFor[e.ID]
}

func fixedClock() func() time.Time {
	t := time.Date(2026, 11, 23, 12, 0, 0, 0, time.UTC)
	return func() time.Time { return t }
}

// Given executions in every lifecycle state,
// When Recover runs,
// Then only PENDING, RUNNING and RECOVERING executions are resumed, in order,
// and nothing is saved.
func TestRecoverResumesOnlyUnfinished(t *testing.T) {
	fs := &fakeStore{list: []store.Execution{
		{ID: "a-pending", Status: store.StatusPending},
		{ID: "b-running", Status: store.StatusRunning},
		{ID: "c-recovering", Status: store.StatusRecovering},
		{ID: "d-done", Status: store.StatusCompleted},
		{ID: "e-failed", Status: store.StatusFailed},
		{ID: "f-await", Status: store.StatusAwaitingApproval},
	}}
	fr := &fakeResumer{}

	res, err := New(Config{}, fs, fr, nil, fixedClock()).Recover(context.Background())
	if err != nil {
		t.Fatalf("Recover returned error: %v", err)
	}

	want := []string{"a-pending", "b-running", "c-recovering"}
	if !reflect.DeepEqual(fr.ids, want) {
		t.Errorf("resumed IDs = %v, want %v", fr.ids, want)
	}
	if !reflect.DeepEqual(res.Resumed, want) {
		t.Errorf("Result.Resumed = %v, want %v", res.Resumed, want)
	}
	if len(fs.saved) != 0 {
		t.Errorf("saved %d executions, want none: %+v", len(fs.saved), fs.saved)
	}
}

// Given the store List call fails,
// When Recover runs,
// Then the store error is wrapped and returned and no execution is resumed.
func TestRecoverListError(t *testing.T) {
	listErr := errors.New("disk")
	fs := &fakeStore{listErr: listErr}
	fr := &fakeResumer{}

	_, err := New(Config{}, fs, fr, nil, fixedClock()).Recover(context.Background())
	if !errors.Is(err, listErr) {
		t.Fatalf("Recover error = %v, want wrapping %v", err, listErr)
	}
	if len(fr.ids) != 0 {
		t.Errorf("resumer recorded IDs %v, want none", fr.ids)
	}
}
