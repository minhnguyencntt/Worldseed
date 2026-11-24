# UNIT-092 — Act: Confirm scheduler construction and start in main

## Summary
Verify NewScheduler and main start the scheduler and fix any gap

## Description
Read server.NewScheduler and cmd/server/main.go and confirm the scheduler is built from cfg and run in a goroutine with the signal context.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `NewScheduler` · L140-L162
- **Do:** Confirm the returned round.Scheduler sets Controller to newRoundService(cfg), Rounds to &round.FileStore{Root: cfg.Storage.RepoPath}, Worlds from repo.List and Interval to cfg.Round.SchedulerInterval; set any missing field.

```
Interval: cfg.Round.SchedulerInterval,
```

- **Expected:** All four fields set

### Step 2 — `backend/cmd/server/main.go` · `main` · L30-L33
- **Do:** Confirm go server.NewScheduler(cfg).Run(ctx) is called after signal.NotifyContext and before ListenAndServe; add it if missing.

```
go server.NewScheduler(cfg).Run(ctx)
```

- **Expected:** Scheduler goroutine starts with server

## Acceptance criteria
- NewScheduler sets Controller, Rounds, Worlds and Interval
- main calls go server.NewScheduler(cfg).Run(ctx)

## Definition of done
- Scheduler wired; build passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-092.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-018
- Requirement: REQ-047
- Unit (Act): UNIT-092
- Unit (Verify): UNIT-094
- Status: completed
- Change: UPDATE
