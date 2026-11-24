# UNIT-099 — Act: Confirm Tick open and close dispatch against the injected clock

## Summary
Confirm Tick dispatches Open and Close by clock boundary and fix only if it deviates

## Description
scheduler.go already contains the switch in Tick. Read it and make it match the requirement; change nothing if it already does. Result: Tick opens due SCHEDULED rounds, closes expired OPEN rounds and ignores other states before their boundary.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler.go` · `Scheduler.Tick` · L48-L82
- **Do:** Read the switch inside the rounds loop and confirm the SCHEDULED case uses !now.Before(rd.StartsAt) calling s.Controller.Open and the OPEN case uses !now.Before(rd.EndsAt) calling s.Controller.Close, with now taken from clock.Now(); edit only if a condition differs

```
case rd.Status == StatusScheduled && !now.Before(rd.StartsAt): ... case rd.Status == StatusOpen && !now.Before(rd.EndsAt): ...
```

- **Expected:** Tick dispatches Open and Close exactly at the boundary instant and ignores COMPLETED and future rounds

## Acceptance criteria
- Tick calls Open only for SCHEDULED rounds where !now.Before(StartsAt)
- Tick calls Close only for OPEN rounds where !now.Before(EndsAt)

## Definition of done
- Tick dispatch matches REQ1 with no behavior beyond it
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-099.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-020
- Requirement: REQ-050
- Unit (Act): UNIT-099
- Unit (Verify): UNIT-101
- Status: completed
- Change: NEW
