# UNIT-184 — Act: Add the retry loop and budget stop to Run

## Summary
Replace the single agent call with a bounded retry loop and ErrBudgetExceeded

## Description
Edit runner.go so step 5 loops attempts 1..MaxRetries+1, accumulates cost and stops on budget overrun.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `var ErrBudgetExceeded` · after the Config declaration
- **Do:** Declare an exported sentinel error for budget overrun.

```
var ErrBudgetExceeded = errors.New("runner: budget exceeded")
```

- **Expected:** Symbol exists

### Step 2 — `backend/worker/internal/runner/runner.go` · `Runner.Run step 5 agent call` · the single `e.Attempt = 1; _, err = agent.Run(tctx, dir)` statement in Run
- **Do:** Replace with a loop: var total float64; for attempt := 1; attempt <= r.cfg.MaxRetries+1; attempt++ { e.Attempt = attempt; cost, aerr := r.agent.Run(tctx, dir); total += cost; if total > r.cfg.MaxBudget { err = fmt.Errorf("%w: spent %.2f of %.2f", ErrBudgetExceeded, total, r.cfg.MaxBudget); break }; err = aerr; if aerr == nil || tctx.Err() != nil { break } }. Existing failure/success handling then runs on err.

```
before: e.Attempt = 1; _, err = agent.Run(tctx, dir)
after: loop as described
```

- **Expected:** Retries bounded; budget error wraps ErrBudgetExceeded and stored Attempt equals attempts made

## Acceptance criteria
- Agent is retried up to MaxRetries times
- Total cost above MaxBudget returns ErrBudgetExceeded

## Definition of done
- go build ./internal/runner passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-184.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-038
- Requirement: REQ-093
- Unit (Act): UNIT-184
- Unit (Verify): UNIT-187
- Status: completed
- Change: UPDATE
