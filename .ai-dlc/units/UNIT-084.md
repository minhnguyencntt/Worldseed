# UNIT-084 — Act: Mount admin round routes and expose the scheduler

## Summary
Wire round.Service into server.New and start the scheduler in main

## Description
In server.New build round.FileStore, round.Service and admin.RoundHandler and mount five round routes under the admin group. Expose a NewScheduler builder and start it from main.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `New` · L84-L96
- **Do:** Before r.Route("/api/v1/admin"...), build rs := &round.Service{Store:&round.FileStore{Root:cfg.Storage.RepoPath}, Committer:gitCLI, Revisions:gitCLI, Contributions:store} and rh := &admin.RoundHandler{Rounds:&roundAdmin{Svc:rs}, Lister:store}. Inside the admin group add ar.Post("/rounds", rh.Create), ar.Post("/rounds/{id}/open", rh.Open), ar.Post("/rounds/{id}/close", rh.Close), ar.Get("/rounds/{id}", rh.Get), ar.Get("/rounds/{id}/contributions", rh.Contributions). Import internal/round.
- **Expected:** The five round routes no longer return 404

### Step 2 — `backend/internal/server/server.go` · `new: NewScheduler` · after L97
- **Do:** Add func NewScheduler(cfg *config.Config) *round.Scheduler returning &round.Scheduler{Controller: the round.Service built from cfg, Rounds: the round.FileStore, Worlds: func() ([]string, error) listing IDs from world.Repo.List, Interval: cfg.Round.SchedulerInterval}. Extract the round.Service construction into helper newRoundService(cfg) used by both New and NewScheduler.
- **Expected:** NewScheduler returns a scheduler with the configured interval

### Step 3 — `backend/cmd/server/main.go` · `main` · L26-L27
- **Do:** Before http.ListenAndServe, create ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM); defer stop(); then go server.NewScheduler(cfg).Run(ctx).
- **Expected:** go build ./cmd/server succeeds

## Acceptance criteria
- Five routes mounted behind token
- Scheduler runs in main with cfg.Round.SchedulerInterval

## Definition of done
- go build ./... succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-084.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-016
- Requirement: REQ-043
- Unit (Act): UNIT-084
- Unit (Verify): UNIT-086
- Status: completed
- Change: UPDATE
