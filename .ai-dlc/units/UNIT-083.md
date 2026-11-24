# UNIT-083 — Act: Add round.Service adapter for admin.RoundService

## Summary
Create roundAdmin adapter with type conversion and error mapping

## Description
Add internal/server/rounds_adapter.go with a roundAdmin struct wrapping *round.Service and the conversion round.Round -> world.Round, mapping round errors to admin errors.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/rounds_adapter.go` · `new: toWorldRound and mapRoundErr` · new
- **Do:** Create the package server file with func toWorldRound(r round.Round) world.Round copying ID, Number, string(Status), StartsAt, EndsAt, and func mapRoundErr(err error) error that wraps round.ErrNotFound as admin.ErrNotFound and round.ErrIllegalTransition and round.ErrActiveRound as admin.ErrConflict via fmt.Errorf("%w: %v", ...), otherwise returns err unchanged.

```
func mapRoundErr(err error) error { switch { case errors.Is(err, round.ErrNotFound): return fmt.Errorf("%w: %v", admin.ErrNotFound, err); case errors.Is(err, round.ErrIllegalTransition), errors.Is(err, round.ErrActiveRound): return fmt.Errorf("%w: %v", admin.ErrConflict, err) }; return err }
```

- **Expected:** File compiles with both helpers

### Step 2 — `backend/internal/server/rounds_adapter.go` · `new: roundAdmin (Create, Open, Close, Get)` · new
- **Do:** Add type roundAdmin struct{Svc *round.Service} and implement the four admin.RoundService methods: Create calls Svc.Create(ctx, in.WorldID, in.StartsAt, in.Duration, in.BaseRelease); Open calls Svc.Open(ctx, worldID, roundID, round.OpenOptions{}) then Svc.Get; Close calls Svc.Close then Svc.Get; Get calls Svc.Get. Each returns toWorldRound(result) and mapRoundErr(err). Add var _ admin.RoundService = (*roundAdmin)(nil).
- **Expected:** go build ./internal/server succeeds and the interface assertion holds

## Acceptance criteria
- roundAdmin satisfies admin.RoundService
- Errors map to admin sentinel errors via fmt.Errorf %w

## Definition of done
- go build ./internal/server succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-083.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-016
- Requirement: REQ-042
- Unit (Act): UNIT-083
- Unit (Verify): UNIT-085
- Status: completed
- Change: NEW
