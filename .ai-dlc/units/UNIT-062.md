# UNIT-062 — Verify: Contribution service validation unit tests

## Summary
Unit tests proving the service rejects invalid submissions before anything is written.

## Description
Unit tests written from the requirement spec with mocked Git, clock and temp-dir filesystem only. Context: the service rejects invalid submissions before anything is written. Expected result: all listed tests pass.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/service_test.go` · `TestSubmit_Rejects` · new
- **Do:** Write test TestSubmit_Rejects: table test with fake RoundSource, fake Store and fixed clock: prompt of 2 and 501 runes -> ErrPromptLength; unknown world -> ErrWorldNotFound; round Status CLOSED -> ErrRoundNotOpen; CountByPlayer returns 5 -> ErrLimitReached; HasPrompt true -> ErrDuplicate; prompt with 11 'a' -> ErrSpam; assert Store.Save call count is 0 each time.
- **Run:** `cd backend && go test ./internal/contribution -run 'TestSubmit'`
- **Expected:** Test passes

### Step 2 — `backend/internal/contribution/service_test.go` · `TestSubmit_RateLimit` · new
- **Do:** Write test TestSubmit_RateLimit: fixed clock; 4th submit within RateWindow -> ErrRateLimited; advance clock past window -> success.
- **Run:** `cd backend && go test ./internal/contribution -run 'TestSubmit'`
- **Expected:** Test passes

### Step 3 — `backend/internal/contribution/service_test.go` · `TestSubmit_OK` · new
- **Do:** Write test TestSubmit_OK: valid input returns Contribution with CreatedAt equal to the fixed clock and Save called once.
- **Run:** `cd backend && go test ./internal/contribution -run 'TestSubmit'`
- **Expected:** Test passes

## Acceptance criteria
- Given a prompt shorter than MinPromptLen or longer than MaxPromptLen, when Submit runs, then ErrPromptLength is returned
- Given a world with no round source entry, when Submit runs, then ErrWorldNotFound is returned
- Given a round whose status is not OPEN, when Submit runs, then ErrRoundNotOpen is returned
- Given a player with 5 stored contributions in the round, when Submit runs, then ErrLimitReached is returned
- Given more than RateMax submissions in RateWindow by one player, when Submit runs, then ErrRateLimited is returned
- Given a prompt identical (case/whitespace-insensitive) to the player's earlier one or containing 10+ repeated identical characters, when Submit runs, then ErrDuplicate or ErrSpam is returned

## Definition of done
- Listed tests pass via the unit command
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-062.md`

## Links
- Evidence: EVD-012
- Requirement: REQ-029
- Unit (Act): UNIT-057
- Unit (Verify): UNIT-062
- Status: completed
- Change: UPDATE
