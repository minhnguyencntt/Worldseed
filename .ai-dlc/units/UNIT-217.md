# UNIT-217 — Act: Close expired OPEN Rounds in Poll through the Closer

## Summary
Add the expiry case to Poll that calls Closer.Close and records ClosedNow

## Description
Extend Poller.Poll in poller.go with an OPEN case using the injected Clock.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/poller/poller.go` · `Poller.Poll` · after the StatusClosed case of the switch written by act-detect
- **Do:** Add case r.Status == StatusOpen && !p.clock.Now().Before(r.EndsAt): call p.closer.Close(ctx, p.worldID, r.ID); on nil error append r.ID to res.ClosedNow and res.Closed; on error append fmt.Errorf("poller: close %s: %w", r.ID, err) to a local errs slice. Return res and errors.Join(errs...) at the end. Convert the switch to a tagless switch to allow the condition.

```
case r.Status == StatusOpen && !p.clock.Now().Before(r.EndsAt):
	if err := p.closer.Close(ctx, p.worldID, r.ID); err != nil {
		errs = append(errs, fmt.Errorf("poller: close %s: %w", r.ID, err))
		continue
	}
	res.ClosedNow = append(res.ClosedNow, r.ID)
	res.Closed = append(res.Closed, r.ID)
```

- **Expected:** Expired OPEN Rounds are closed once and reported.

## Acceptance criteria
- Expired OPEN Rounds are closed once; non-expired are not.
- Closed IDs appear in ClosedNow and Closed.

## Definition of done
- poller.go builds and expired Rounds are closed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-217.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-043
- Requirement: REQ-109
- Unit (Act): UNIT-217
- Unit (Verify): UNIT-220
- Status: completed
- Change: UPDATE
