# UNIT-100 — Act: Confirm Tick collects errors and continues after a Controller failure

## Summary
Confirm Tick keeps iterating after an Open error and returns the joined errors

## Description
Tick appends wrapped errors and returns errors.Join. Read it and make it match; change nothing if it already does. Result: an Open failure is returned and later rounds are still processed.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler.go` · `Scheduler.Tick` · L48-L82
- **Do:** Confirm the Open and Close error branches only append fmt.Errorf(... %w, err) to errs without return or continue-out-of-loop, and that the function ends with return errors.Join(errs...); edit only if not

```
errs = append(errs, fmt.Errorf("round: open %s/%s: %w", worldID, rd.ID, err))
```

- **Expected:** A failing Open is wrapped, the loop continues, and Close for the next round still runs

## Acceptance criteria
- Tick never returns early from the rounds loop on an Open or Close error
- The returned error wraps the Controller error so errors.Is matches it

## Definition of done
- Error handling matches REQ2
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-100.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-020
- Requirement: REQ-051
- Unit (Act): UNIT-100
- Unit (Verify): UNIT-102
- Status: completed
- Change: UPDATE
