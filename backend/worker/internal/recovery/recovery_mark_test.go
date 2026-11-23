package recovery

import (
	"context"
	"errors"
	"reflect"
	"testing"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// Given a RUNNING execution whose resume fails and a second RUNNING execution whose resume succeeds,
// When Recover runs with a fixed clock,
// Then the failed execution is saved as RECOVERING with the error text and the clock time,
// and the other execution is only resumed.
func TestRecoverMarksFailedResume(t *testing.T) {
	clock := fixedClock()
	fs := &fakeStore{list: []store.Execution{
		{ID: "a-run", Status: store.StatusRunning},
		{ID: "b-run", Status: store.StatusRunning},
	}}
	fr := &fakeResumer{errFor: map[string]error{"a-run": errors.New("agent gone")}}

	res, err := New(Config{}, fs, fr, nil, clock).Recover(context.Background())
	if err != nil {
		t.Fatalf("Recover returned error: %v", err)
	}

	if len(fs.saved) != 1 {
		t.Fatalf("saved %d executions, want 1: %+v", len(fs.saved), fs.saved)
	}
	got := fs.saved[0]
	if got.ID != "a-run" {
		t.Errorf("saved ID = %q, want %q", got.ID, "a-run")
	}
	if got.Status != store.StatusRecovering {
		t.Errorf("saved Status = %q, want %q", got.Status, store.StatusRecovering)
	}
	if got.Error != "agent gone" {
		t.Errorf("saved Error = %q, want %q", got.Error, "agent gone")
	}
	if want := clock(); !got.UpdatedAt.Equal(want) {
		t.Errorf("saved UpdatedAt = %v, want fixed clock %v", got.UpdatedAt, want)
	}

	if want := []string{"a-run", "b-run"}; !reflect.DeepEqual(fr.ids, want) {
		t.Errorf("resumed IDs = %v, want %v", fr.ids, want)
	}
	if want := []string{"a-run"}; !reflect.DeepEqual(res.Marked, want) {
		t.Errorf("Result.Marked = %v, want %v", res.Marked, want)
	}
	if want := []string{"b-run"}; !reflect.DeepEqual(res.Resumed, want) {
		t.Errorf("Result.Resumed = %v, want %v", res.Resumed, want)
	}
}

// Given a RUNNING execution whose resume fails and a store whose Save fails,
// When Recover runs,
// Then Recover returns an error that wraps the save error.
func TestRecoverSaveFailure(t *testing.T) {
	saveErr := errors.New("disk full")
	fs := &fakeStore{
		list:    []store.Execution{{ID: "a-run", Status: store.StatusRunning}},
		saveErr: saveErr,
	}
	fr := &fakeResumer{errFor: map[string]error{"a-run": errors.New("agent gone")}}

	_, err := New(Config{}, fs, fr, nil, fixedClock()).Recover(context.Background())
	if !errors.Is(err, saveErr) {
		t.Fatalf("Recover error = %v, want wrapping %v", err, saveErr)
	}
}
