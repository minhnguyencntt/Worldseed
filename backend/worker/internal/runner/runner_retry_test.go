package runner

import (
	"context"
	"errors"
	"strings"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// TestRunRetriesThenSucceeds verifies that a failing agent is retried until it succeeds.
// Given MaxRetries is 2 and the agent fails twice before succeeding,
// When Run is called,
// Then it returns no error, the agent ran three times and the stored Attempt is 3.
func TestRunRetriesThenSucceeds(t *testing.T) {
	agent := &fakeAgent{errs: []error{errors.New("x"), errors.New("y"), nil}}
	h := newRunner(t, Config{MaxRetries: 2, MaxBudget: 100, Timeout: 5 * time.Second}, agent)

	if _, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001"); err != nil {
		t.Fatalf("Run returned error: %v", err)
	}
	if agent.calls != 3 {
		t.Errorf("agent.calls = %d; want 3", agent.calls)
	}

	got, err := h.st.Get("EXEC-1")
	if err != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", err)
	}
	if got.Attempt != 3 {
		t.Errorf("stored Attempt = %d; want 3", got.Attempt)
	}
}

// TestRunRetryExhausted verifies that the execution fails once all retries are used up.
// Given MaxRetries is 1 and the agent fails on every call,
// When Run is called,
// Then the agent ran twice, the stored status is FAILED and the stored error contains the second error text.
func TestRunRetryExhausted(t *testing.T) {
	agent := &fakeAgent{errs: []error{errors.New("first failure"), errors.New("second failure")}}
	h := newRunner(t, Config{MaxRetries: 1, MaxBudget: 100, Timeout: 5 * time.Second}, agent)

	if _, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001"); err == nil {
		t.Fatalf("Run returned nil error; want an error after retries are exhausted")
	}
	if agent.calls != 2 {
		t.Errorf("agent.calls = %d; want 2", agent.calls)
	}

	got, err := h.st.Get("EXEC-1")
	if err != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", err)
	}
	if got.Status != store.StatusFailed {
		t.Errorf("stored status = %q; want %q", got.Status, store.StatusFailed)
	}
	if !strings.Contains(got.Error, "second failure") {
		t.Errorf("stored error = %q; want it to contain %q", got.Error, "second failure")
	}
}

// TestRunBudgetExceeded verifies that retries stop once the accumulated cost exceeds the budget.
// Given each agent call costs 3.0, MaxBudget is 5.0, MaxRetries is 5 and every call fails,
// When Run is called,
// Then it returns an error wrapping ErrBudgetExceeded and the agent ran exactly twice.
func TestRunBudgetExceeded(t *testing.T) {
	agent := &fakeAgent{
		cost: 3.0,
		errs: []error{errors.New("a"), errors.New("b"), errors.New("c"), errors.New("d"), errors.New("e"), errors.New("f")},
	}
	h := newRunner(t, Config{MaxRetries: 5, MaxBudget: 5.0, Timeout: 5 * time.Second}, agent)

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if !errors.Is(err, ErrBudgetExceeded) {
		t.Fatalf("Run error = %v; want errors.Is(err, ErrBudgetExceeded)", err)
	}
	if agent.calls != 2 {
		t.Errorf("agent.calls = %d; want 2", agent.calls)
	}
}
