package runner

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/report"
)

// errReporter is a test double for Reporter whose Write always fails with err.
type errReporter struct {
	err error
}

func (e *errReporter) Write(report.Report) error {
	return e.err
}

// TestRunReportDurationFromClock verifies that the report duration is derived from the injected clock.
// Given an injected clock that advances by one second on every call,
// When Run succeeds with AutoPublish true and a reporter is set,
// Then the report DurationMS is positive and equals FinishedAt.Sub(StartedAt) in milliseconds.
func TestRunReportDurationFromClock(t *testing.T) {
	agent := &fakeAgent{}
	h := newRunner(t, Config{AutoPublish: true}, agent)

	base := fixedNow
	n := 0
	h.r.now = func() time.Time {
		ts := base.Add(time.Duration(n) * time.Second)
		n++
		return ts
	}

	rep := &fakeReporter{}
	h.r.SetReporter(rep)

	if _, err := h.r.Run(context.Background(), "exec-1", "ROUND-0000001"); err != nil {
		t.Fatalf("Run returned error: %v", err)
	}
	if len(rep.reports) != 1 {
		t.Fatalf("reports written = %d; want 1", len(rep.reports))
	}
	got := rep.reports[0]
	if got.DurationMS <= 0 {
		t.Errorf("report DurationMS = %d; want > 0", got.DurationMS)
	}
	want := got.FinishedAt.Sub(got.StartedAt).Milliseconds()
	if got.DurationMS != want {
		t.Errorf("report DurationMS = %d; want %d (FinishedAt - StartedAt)", got.DurationMS, want)
	}
}

// TestRunReporterErrorReturnedOnSuccess verifies that a reporter write failure is surfaced on a successful run.
// Given the agent succeeds with AutoPublish true and the reporter fails with "disk full",
// When Run is called,
// Then the returned error wraps the reporter error so errors.Is matches it.
func TestRunReporterErrorReturnedOnSuccess(t *testing.T) {
	agent := &fakeAgent{}
	h := newRunner(t, Config{AutoPublish: true}, agent)
	diskFull := errors.New("disk full")
	h.r.SetReporter(&errReporter{err: diskFull})

	_, err := h.r.Run(context.Background(), "exec-1", "ROUND-0000001")
	if !errors.Is(err, diskFull) {
		t.Fatalf("Run error = %v; want errors.Is(err, diskFull)", err)
	}
}

// TestRunReporterErrorDoesNotMaskRunError verifies that a run error takes precedence over a reporter failure.
// Given the agent fails with "boom" with no retries and the reporter fails with "disk full",
// When Run is called,
// Then the returned error wraps "boom" and does not wrap the reporter error.
func TestRunReporterErrorDoesNotMaskRunError(t *testing.T) {
	boom := errors.New("boom")
	diskFull := errors.New("disk full")
	agent := &fakeAgent{errs: []error{boom}}
	h := newRunner(t, Config{MaxRetries: 0}, agent)
	h.r.SetReporter(&errReporter{err: diskFull})

	_, err := h.r.Run(context.Background(), "exec-1", "ROUND-0000001")
	if !errors.Is(err, boom) {
		t.Fatalf("Run error = %v; want errors.Is(err, boom)", err)
	}
	if errors.Is(err, diskFull) {
		t.Errorf("Run error = %v; reporter error must not mask the run error", err)
	}
}

// TestRunNilReporter verifies that a run without a reporter completes without panicking.
// Given no reporter is set and the agent succeeds with AutoPublish true,
// When Run is called,
// Then it returns a nil error.
func TestRunNilReporter(t *testing.T) {
	agent := &fakeAgent{}
	h := newRunner(t, Config{AutoPublish: true}, agent)

	if _, err := h.r.Run(context.Background(), "exec-1", "ROUND-0000001"); err != nil {
		t.Fatalf("Run error = %v; want nil", err)
	}
}
