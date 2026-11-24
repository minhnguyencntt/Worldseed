# UNIT-087 — Act: Confirm Tick open and close dispatch against the injected clock

## Summary
Keep the Tick switch cases for SCHEDULED open and OPEN close using Clock.Now()

## Description
Scheduler.Tick already dispatches Open and Close using clock.Now(). This unit keeps that code correct: the boundary comparison uses !now.Before so a time equal to StartsAt or EndsAt counts as due. No behavior change is expected unless the Verify unit finds a mismatch.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler.go` · `Scheduler.Tick` · L63-L75
- **Do:** Check that the case for StatusScheduled uses !now.Before(rd.StartsAt) and calls s.Controller.Open(ctx, worldID, rd.ID, OpenOptions{}), and the case for StatusOpen uses !now.Before(rd.EndsAt) and calls s.Controller.Close(ctx, worldID, rd.ID). Change nothing if both hold.

```
case rd.Status == StatusScheduled && !now.Before(rd.StartsAt): ... case rd.Status == StatusOpen && !now.Before(rd.EndsAt): ...
```

- **Expected:** The two switch cases match the snippet and go build ./internal/round/ succeeds.

## Acceptance criteria
- Given a SCHEDULED round with StartsAt not after the clock, when Tick runs, then Controller.Open is called.
- Given an OPEN round with EndsAt not after the clock, when Tick runs, then Controller.Close is called.

## Definition of done
- Tick switch cases use !now.Before(StartsAt) and !now.Before(EndsAt)
- go build ./internal/round/ succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-087.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-017
- Requirement: REQ-044
- Unit (Act): UNIT-087
- Unit (Verify): UNIT-089
- Status: completed
- Change: UPDATE
