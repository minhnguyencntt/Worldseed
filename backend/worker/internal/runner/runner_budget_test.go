package runner

import (
	"context"
	"errors"
	"testing"
	"time"
)

// TestRunZeroRetriesRunsOnce verifies that with MaxRetries 0 a failing agent is run exactly once.
// Given MaxRetries is 0, MaxBudget is 100 and the agent fails once,
// When Run is called,
// Then it returns an error, the agent ran once, the returned Attempt is 1 and the error is not ErrBudgetExceeded.
func TestRunZeroRetriesRunsOnce(t *testing.T) {
	agent := &fakeAgent{errs: []error{errors.New("x")}}
	h := newRunner(t, Config{MaxRetries: 0, MaxBudget: 100, Timeout: 5 * time.Second}, agent)

	got, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if err == nil {
		t.Fatal("Run error = nil; want error from agent")
	}
	if agent.calls != 1 {
		t.Errorf("agent.calls = %d; want 1", agent.calls)
	}
	if got.Attempt != 1 {
		t.Errorf("returned Attempt = %d; want 1", got.Attempt)
	}
	if errors.Is(err, ErrBudgetExceeded) {
		t.Errorf("Run error = %v; want it not to wrap ErrBudgetExceeded", err)
	}
}

// TestRunZeroBudgetUnlimited verifies that a zero MaxBudget does not stop retries.
// Given each agent call costs 100, MaxRetries is 2, MaxBudget is 0 and every call fails,
// When Run is called,
// Then the agent ran three times and the error is not ErrBudgetExceeded.
func TestRunZeroBudgetUnlimited(t *testing.T) {
	agent := &fakeAgent{
		cost: 100,
		errs: []error{errors.New("a"), errors.New("b"), errors.New("c")},
	}
	h := newRunner(t, Config{MaxRetries: 2, MaxBudget: 0, Timeout: 5 * time.Second}, agent)

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if err == nil {
		t.Fatal("Run error = nil; want error from agent")
	}
	if agent.calls != 3 {
		t.Errorf("agent.calls = %d; want 3", agent.calls)
	}
	if errors.Is(err, ErrBudgetExceeded) {
		t.Errorf("Run error = %v; want it not to wrap ErrBudgetExceeded", err)
	}
}

// TestRunBudgetEqualNotExceeded verifies that spending exactly the budget does not count as exceeded.
// Given each agent call costs 2.5, MaxRetries is 2, MaxBudget is 5.0 and every call fails,
// When Run is called,
// Then the agent ran three times and the error is not ErrBudgetExceeded.
func TestRunBudgetEqualNotExceeded(t *testing.T) {
	agent := &fakeAgent{
		cost: 2.5,
		errs: []error{errors.New("a"), errors.New("b"), errors.New("c")},
	}
	h := newRunner(t, Config{MaxRetries: 2, MaxBudget: 5.0, Timeout: 5 * time.Second}, agent)

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if err == nil {
		t.Fatal("Run error = nil; want error from agent")
	}
	if agent.calls != 3 {
		t.Errorf("agent.calls = %d; want 3", agent.calls)
	}
	if errors.Is(err, ErrBudgetExceeded) {
		t.Errorf("Run error = %v; want it not to wrap ErrBudgetExceeded", err)
	}
}
