# UNIT-073 — Act: Implement round Scheduler with injected Clock

## Summary
Add scheduler.go with Tick and Run

## Description
Scheduler iterates worlds, lists rounds and calls the lifecycle controller.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler.go` · `new: Clock, Controller, Scheduler, Tick, Run` · new
- **Do:** Define Clock, Controller, Lister{List(worldID)([]Round,error)}; Scheduler{Controller, Rounds Lister, Worlds func()([]string,error), Clock, Interval}. Tick(ctx): for each world and round, if Status==SCHEDULED and !Clock.Now().Before(StartsAt) call Open with zero OpenOptions; if Status==OPEN and !Clock.Now().Before(EndsAt) call Close; collect errors with errors.Join. Run(ctx): ticker of Interval (default 30s) calling Tick, logging errors with slog, returning on ctx.Done()
- **Expected:** Tick drives the lifecycle

## Acceptance criteria
- Tick returns the first error but continues other rounds
- Run ticks every Interval until ctx is done

## Definition of done
- go build ./internal/round
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-073.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-015
- Requirement: REQ-038
- Unit (Act): UNIT-073
- Unit (Verify): UNIT-079
- Status: completed
- Change: UPDATE
