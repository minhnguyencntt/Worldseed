# UNIT-071 — Act: Implement round model, transition table and FileStore

## Summary
Create round.go and store.go in internal/round

## Description
Create the round package: Status type and 13 constants, Round struct with yaml tags, Transitions map, CanTransition and Round.Transition, and FileStore with Get, Save and List.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/round.go` · `new: Status, Round, Transitions, CanTransition, (*Round).Transition, ErrIllegalTransition` · new
- **Do:** Declare type Status string with constants StatusScheduled..StatusRecovering (values are the upper-case names), Round{ID, WorldID, Number, Status, StartsAt, EndsAt, BaseRelease, FreezeCommit, ClosedAt} with yaml tags id, world, number, status, starts_at, ends_at, base_release, freeze_commit, closed_at; Transitions map[Status][]Status per the acceptance criteria; CanTransition(from,to) bool; (*Round).Transition(to) error returning fmt.Errorf wrapping ErrIllegalTransition and leaving Status unchanged when not allowed

```
var ErrIllegalTransition = errors.New("round: illegal transition")
```

- **Expected:** Package compiles; Transition mutates Status only on legal moves

### Step 2 — `backend/internal/round/store.go` · `new: FileStore (Root string), Get, Save, List, RoundDir` · new
- **Do:** Add FileStore with Root; RoundDir(worldID, roundID) validates both with safepath.Segment and returns filepath.Join(Root,"worlds",worldID,"rounds",strings.ToLower(roundID)); Get reads round.yaml (yaml.v3) and returns ErrNotFound when missing; Save marshals to a temp file in the same dir then os.Rename to round.yaml, MkdirAll 0o755; List(worldID) reads rounds/* dirs and returns all rounds sorted by Number
- **Expected:** Round round-trips through round.yaml; unsafe ids error

## Acceptance criteria
- Transitions follow SCHEDULED→OPEN|CANCELLED, OPEN→CLOSED|CANCELLED, CLOSED→ANALYZING|FAILED|CANCELLED, ANALYZING→PLANNING|FAILED, PLANNING→DEVELOPING|FAILED, DEVELOPING→TESTING|FAILED, TESTING→BUILDING|FAILED, BUILDING→PUBLISHING|FAILED, PUBLISHING→COMPLETED|FAILED, FAILED→RECOVERING|CANCELLED, RECOVERING→ANALYZING|FAILED|CANCELLED
- COMPLETED and CANCELLED have no outgoing transitions
- FileStore.Save never leaves a partial round.yaml

## Definition of done
- go build ./internal/round succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-071.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-015
- Requirement: REQ-036
- Unit (Act): UNIT-071
- Unit (Verify): UNIT-077
- Status: completed
- Change: UPDATE
