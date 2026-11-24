# UNIT-088 — Act: Confirm Tick skips non-due rounds and continues after Controller errors

## Summary
Keep the per-round loop collecting errors without returning early

## Description
The Tick loop appends wrapped errors to errs and continues, returning errors.Join(errs...). Rounds with other statuses or future boundaries match no case. This unit keeps that code correct and changes nothing unless the Verify unit finds a mismatch.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler.go` · `Scheduler.Tick` · L63-L79
- **Do:** Check that both Controller error branches do errs = append(errs, fmt.Errorf(... %w, err)) with no return or break, and that the function ends with return errors.Join(errs...). Change nothing if so.

```
errs = append(errs, fmt.Errorf("round: open %s/%s: %w", worldID, rd.ID, err))
```

- **Expected:** No early return in the loop and Tick returns errors.Join(errs...).

## Acceptance criteria
- Given Open fails for one round, when Tick runs, then the loop still processes the remaining rounds.
- Given a round matching no case, when Tick runs, then no Controller call is made.

## Definition of done
- Open and Close errors are appended to errs and the loop continues
- go build ./internal/round/ succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-088.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-017
- Requirement: REQ-045
- Unit (Act): UNIT-088
- Unit (Verify): UNIT-090
- Status: completed
- Change: UPDATE
