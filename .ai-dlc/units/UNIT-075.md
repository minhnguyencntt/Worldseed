# UNIT-075 — Act: Add admin round handlers, route wiring and scheduler start

## Summary
Implement rounds.go, NewWithScheduler and main wiring

## Description
Handler maps service errors to HTTP statuses; server builds the shared Service and routes.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/admin/rounds.go` · `new: RoundHandler (Create, Open, Close, Get, Contributions)` · new
- **Do:** Define RoundService{Create,Open,Close,Get} and ContributionLister{ListByRound}; RoundHandler methods decode JSON {world_id,starts_at,duration,base_release}, read chi param id and query world, call the service, write JSON, and map errors via a statusFor(err) helper (404/409/400/500)
- **Expected:** Handlers return JSON with correct codes

### Step 2 — `backend/internal/server/server.go` · `New, NewWithScheduler, roundSource` · L21-L81, L84-L97
- **Do:** Rename body of New into NewWithScheduler(cfg,log) (http.Handler,*round.Scheduler) and make New call it returning only the handler; build round.FileStore and round.Service (Git: gitrepo.CLI, Contributions: contribution FileStore, DefaultDuration cfg.Round.Duration, DefaultBaseRelease cfg.Round.BaseRelease); register r.Route("/api/v1/admin") with r.Use(admin.Middleware(cfg.Admin.Token)) and the five round routes; change roundSource.Current to read the latest round from the round FileStore (by world) instead of world.Repo; build Scheduler with Worlds from world.Repo.List and time-based Clock
- **Expected:** Admin routes protected; contributions see round.yaml status

### Step 3 — `backend/cmd/server/main.go` · `main` · L24-L30
- **Do:** Call server.NewWithScheduler, start `go sched.Run(ctx)` with a signal.NotifyContext context, and pass the handler to http.ListenAndServe
- **Expected:** Scheduler runs alongside the server

## Acceptance criteria
- ErrNotFound->404, ErrIllegalTransition and ErrActiveRound->409, bad JSON->400
- roundSource.Current uses the round FileStore latest round

## Definition of done
- go build ./...
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-075.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-015
- Requirement: REQ-040
- Unit (Act): UNIT-075
- Unit (Verify): UNIT-081
- Status: completed
- Change: UPDATE
