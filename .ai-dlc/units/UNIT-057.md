# UNIT-057 — Act: Implement contribution service validation rules

## Summary
The service rejects invalid submissions before anything is written.

## Description
Context: no contribution logic exists. Desired behavior: Service.Submit validates prompt length, world existence, OPEN round, per-player limit of 5, request rate and duplicate/spam prompts using an injected clock. Expected result: typed errors per rule. Why: protect the Git-backed record from abuse.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/service.go` · `new: Service, Limits, Round, RoundSource, Store, Input, Submit` · new
- **Do:** Create package contribution with errors ErrPromptLength, ErrWorldNotFound, ErrRoundNotOpen, ErrLimitReached, ErrRateLimited, ErrDuplicate, ErrSpam; type Round{ID, Status string}; interface RoundSource{Current(worldID string) (Round, error)} (returns ErrWorldNotFound for unknown world); interface Store{Save(ctx, Contribution) error; CountByPlayer(worldID, roundID, playerID string) (int, error); HasPrompt(worldID, roundID, playerID, hash string) (bool, error)}; struct Limits{MinPromptLen, MaxPromptLen, MaxPerPlayer int; RateMax int; RateWindow time.Duration}; Service{Rounds, Store, Limits, Now func() time.Time}; Submit(ctx, Input{WorldID, PlayerID, Prompt}) (Contribution, error) that trims the prompt then checks in order: length (rune count), world/round via Rounds.Current, Status == "OPEN", spam run >= 10 identical runes, rate limiter Allow(playerID, Now()), CountByPlayer >= MaxPerPlayer, HasPrompt with sha256 of lower-cased whitespace-collapsed prompt, then Store.Save.
- **Expected:** Submit returns the typed error for each violated rule and calls Store.Save only when all pass

### Step 2 — `backend/internal/contribution/ratelimit.go` · `new: rateLimiter` · new
- **Do:** Create rateLimiter{mu sync.Mutex; hits map[string][]time.Time; max int; window time.Duration} with Allow(key string, now time.Time) bool that drops hits older than now-window, returns false when len(hits) >= max, otherwise appends now and returns true.
- **Expected:** Allow is false on the (max+1)th call within the window and true again after the window passes

## Acceptance criteria
- Given a prompt shorter than MinPromptLen or longer than MaxPromptLen, when Submit runs, then ErrPromptLength is returned
- Given a world with no round source entry, when Submit runs, then ErrWorldNotFound is returned
- Given a round whose status is not OPEN, when Submit runs, then ErrRoundNotOpen is returned

## Definition of done
- Product code compiles with go build ./...
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-057.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-012
- Requirement: REQ-029
- Unit (Act): UNIT-057
- Unit (Verify): UNIT-062
- Status: completed
- Change: UPDATE
