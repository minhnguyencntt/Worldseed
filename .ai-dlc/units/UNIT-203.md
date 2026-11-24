# UNIT-203 — Act: Export ErrTimeout and wrap it in runAttempt

## Summary
Add ErrTimeout sentinel returned when an attempt exceeds Config.Timeout

## Description
Add a package-level ErrTimeout next to ErrBudgetExceeded and make runAttempt wrap it with the original deadline error when the attempt context expired while the parent context is still live.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `ErrTimeout` · after L20
- **Do:** Declare exported sentinel ErrTimeout directly after ErrBudgetExceeded with a doc comment saying it is returned (wrapped) when one agent attempt exceeds Config.Timeout.

```
// ErrTimeout is returned (wrapped) when an agent attempt exceeds Config.Timeout.
var ErrTimeout = errors.New("runner: agent attempt timed out")
```

- **Expected:** runner package exports ErrTimeout and compiles

### Step 2 — `backend/worker/internal/runner/runner.go` · `Runner.runAttempt` · L214-L219
- **Do:** Keep the WithTimeout call, store the agent result in cost and err, and when err != nil and tctx.Err() is context.DeadlineExceeded and ctx.Err() == nil, return cost and fmt.Errorf("%w: %w", ErrTimeout, err); otherwise return cost, err unchanged.

```
cost, err := r.agent.Run(tctx, dir)
if err != nil && errors.Is(tctx.Err(), context.DeadlineExceeded) && ctx.Err() == nil {
	return cost, fmt.Errorf("%w: %w", ErrTimeout, err)
}
return cost, err
```

- **Expected:** Timed-out attempts wrap ErrTimeout and context.DeadlineExceeded

## Acceptance criteria
- runAttempt returns an error satisfying errors.Is for both ErrTimeout and context.DeadlineExceeded when the attempt deadline fires
- runAttempt does not add ErrTimeout when the parent ctx is already done

## Definition of done
- ErrTimeout declared with doc comment and applied in runAttempt
- go build ./... passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-203.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-041
- Requirement: REQ-102
- Unit (Act): UNIT-203
- Unit (Verify): UNIT-206
- Status: completed
- Change: UPDATE
