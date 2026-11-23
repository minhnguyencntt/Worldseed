package runner

import (
	"context"
	"errors"
	"strings"
	"testing"

	"github.com/worldseed/storyforge/worker/internal/lock"
	"github.com/worldseed/storyforge/worker/internal/report"
	"github.com/worldseed/storyforge/worker/internal/store"
)

// fakeReporter is a test double for Reporter that collects every report it is given.
type fakeReporter struct {
	reports []report.Report
}

func (f *fakeReporter) Write(r report.Report) error {
	f.reports = append(f.reports, r)
	return nil
}

// TestRunReportsFailure verifies that a failed execution produces exactly one FAILED report.
// Given the agent fails once with "boom" and no retries are allowed,
// When Run is called with a reporter set,
// Then exactly one report is written with status FAILED, the error text "boom" and ExecutionID "exec-1".
func TestRunReportsFailure(t *testing.T) {
	agent := &fakeAgent{errs: []error{errors.New("boom")}}
	h := newRunner(t, Config{MaxRetries: 0}, agent)
	rep := &fakeReporter{}
	h.r.SetReporter(rep)

	if _, err := h.r.Run(context.Background(), "exec-1", "ROUND-0000001"); err == nil {
		t.Fatal("Run error = nil; want error from agent")
	}

	if len(rep.reports) != 1 {
		t.Fatalf("reports written = %d; want 1", len(rep.reports))
	}
	got := rep.reports[0]
	if got.Status != store.StatusFailed {
		t.Errorf("report Status = %q; want %q", got.Status, store.StatusFailed)
	}
	if !strings.Contains(got.Error, "boom") {
		t.Errorf("report Error = %q; want it to contain %q", got.Error, "boom")
	}
	if got.ExecutionID != "exec-1" {
		t.Errorf("report ExecutionID = %q; want %q", got.ExecutionID, "exec-1")
	}
}

// TestRunReportsApprovalAndCompleted verifies the report status for the approval gate and for auto-publish.
// Given the agent succeeds,
// When Run is called with AutoPublish false and then with AutoPublish true,
// Then the first report has status AWAITING_APPROVAL, the second has status COMPLETED,
// and both reports have StartedAt equal to the injected fixedNow clock.
func TestRunReportsApprovalAndCompleted(t *testing.T) {
	gated := &fakeAgent{}
	hg := newRunner(t, Config{AutoPublish: false}, gated)
	repGated := &fakeReporter{}
	hg.r.SetReporter(repGated)

	if _, err := hg.r.Run(context.Background(), "exec-1", "ROUND-0000001"); err != nil {
		t.Fatalf("gated Run returned error: %v", err)
	}
	if len(repGated.reports) != 1 {
		t.Fatalf("gated reports written = %d; want 1", len(repGated.reports))
	}
	if got := repGated.reports[0]; got.Status != store.StatusAwaitingApproval {
		t.Errorf("gated report Status = %q; want %q", got.Status, store.StatusAwaitingApproval)
	}
	if got := repGated.reports[0]; !got.StartedAt.Equal(fixedNow) {
		t.Errorf("gated report StartedAt = %v; want %v", got.StartedAt, fixedNow)
	}

	auto := &fakeAgent{}
	ha := newRunner(t, Config{AutoPublish: true}, auto)
	repAuto := &fakeReporter{}
	ha.r.SetReporter(repAuto)

	if _, err := ha.r.Run(context.Background(), "exec-1", "ROUND-0000001"); err != nil {
		t.Fatalf("auto-publish Run returned error: %v", err)
	}
	if len(repAuto.reports) != 1 {
		t.Fatalf("auto-publish reports written = %d; want 1", len(repAuto.reports))
	}
	if got := repAuto.reports[0]; got.Status != store.StatusCompleted {
		t.Errorf("auto-publish report Status = %q; want %q", got.Status, store.StatusCompleted)
	}
	if got := repAuto.reports[0]; !got.StartedAt.Equal(fixedNow) {
		t.Errorf("auto-publish report StartedAt = %v; want %v", got.StartedAt, fixedNow)
	}
}

// TestRunLockedWritesNoReport verifies that lock contention produces no report.
// Given the World lock is already held by another run,
// When Run is called with a reporter set,
// Then it returns an error wrapping lock.ErrLocked and the reporter receives zero reports.
func TestRunLockedWritesNoReport(t *testing.T) {
	agent := &fakeAgent{}
	h := newRunner(t, Config{}, agent)
	rep := &fakeReporter{}
	h.r.SetReporter(rep)

	held, err := lock.Acquire(h.cfg.LockPath)
	if err != nil {
		t.Fatalf("lock.Acquire(%q): %v", h.cfg.LockPath, err)
	}
	defer func() { _ = held.Release() }()

	_, err = h.r.Run(context.Background(), "exec-1", "ROUND-0000001")
	if !errors.Is(err, lock.ErrLocked) {
		t.Fatalf("Run error = %v; want errors.Is(err, lock.ErrLocked)", err)
	}
	if len(rep.reports) != 0 {
		t.Errorf("reports written = %d; want 0", len(rep.reports))
	}
}
