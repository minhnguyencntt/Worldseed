# UNIT-245 — Act: Confirm cmd/server/main.go reads only kept config fields

## Summary
Confirm main.go wiring uses no worker or execution config

## Description
Read main.go and confirm it only calls config.Load, server.NewScheduler(cfg), server.New(cfg, logger) and reads cfg.Server.Addr. Remove any worker wiring found; none is expected.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/cmd/server/main.go` · `main` · L17-L46
- **Do:** Check that main only uses config.Load, server.NewScheduler(cfg).Run, server.New(cfg, logger) and cfg.Server.Addr. Remove any worker or execution wiring found.
- **Run:** `cd backend && go build ./cmd/server && grep -niE 'worker|execution' cmd/server/main.go || true`
- **Expected:** The package builds with no worker or execution reference

## Acceptance criteria
- main.go has no worker or execution reference
- main.go builds

## Definition of done
- main.go compiles with no worker or execution reference
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-245.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-048
- Requirement: REQ-123
- Unit (Act): UNIT-245
- Unit (Verify): UNIT-247
- Status: completed
- Change: UPDATE
