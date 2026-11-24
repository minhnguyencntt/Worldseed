# UNIT-085 — Verify: Round admin adapter unit tests

## Summary
Unit tests for conversion and error mapping

## Description
Test toWorldRound and mapRoundErr in internal/server with pure inputs; no network or real git.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/rounds_adapter_test.go` · `new: TestToWorldRound` · new
- **Do:** Build a round.Round{ID:"ROUND-0000001",Number:1,Status:round.StatusOpen,StartsAt,EndsAt fixed times} and assert toWorldRound returns a world.Round with identical ID, Number, StartsAt, EndsAt and Status "OPEN".
- **Run:** `cd backend && go test ./internal/server -run TestToWorldRound`
- **Expected:** TestToWorldRound passes

### Step 2 — `backend/internal/server/rounds_adapter_test.go` · `new: TestMapRoundErr` · new
- **Do:** Table test: round.ErrNotFound -> errors.Is admin.ErrNotFound; fmt.Errorf-wrapped round.ErrIllegalTransition and round.ErrActiveRound -> errors.Is admin.ErrConflict; errors.New("boom") returned unchanged.
- **Run:** `cd backend && go test ./internal/server -run TestMapRoundErr`
- **Expected:** TestMapRoundErr passes

## Acceptance criteria
- toWorldRound copies fields
- mapRoundErr maps sentinel errors

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-085.md`

## Links
- Evidence: EVD-016
- Requirement: REQ-042
- Unit (Act): UNIT-083
- Unit (Verify): UNIT-085
- Status: completed
- Change: UPDATE
