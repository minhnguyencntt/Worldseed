# UNIT-077 — Verify: Round transition table and FileStore unit tests

## Summary
Unit tests for transitions and round.yaml persistence

## Description
Write TDD-style tests in internal/round using t.TempDir only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/round_test.go` · `new: TestTransitions` · new
- **Do:** Table test: iterate Transitions and assert CanTransition true for each listed edge; assert CanTransition false for SCHEDULED→CLOSED, OPEN→SCHEDULED, COMPLETED→OPEN, CANCELLED→OPEN, CLOSED→OPEN; assert Transition returns errors.Is ErrIllegalTransition and Status is unchanged
- **Run:** `cd backend && go test ./internal/round -run TestTransitions`
- **Expected:** TestTransitions passes (go test reports PASS)

### Step 2 — `backend/internal/round/store_test.go` · `new: TestFileStore_RoundTrip, TestFileStore_UnsafeIDs` · new
- **Do:** Save a Round{ID:"ROUND-0000001",WorldID:"the-boys-room",Number:1,Status:StatusOpen,BaseRelease:"1.0.0"} into t.TempDir, assert file worlds/the-boys-room/rounds/round-0000001/round.yaml exists and Get returns equal fields; assert Save/Get with WorldID "../x" returns an error and no file is created
- **Run:** `cd backend && go test ./internal/round -run TestFileStore`
- **Expected:** TestFileStore tests pass (go test reports PASS)

## Acceptance criteria
- Every legal edge passes and a table of illegal edges returns ErrIllegalTransition with status unchanged
- Save then Get round-trips all fields; unsafe ids are rejected

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-077.md`

## Links
- Evidence: EVD-015
- Requirement: REQ-036
- Unit (Act): UNIT-071
- Unit (Verify): UNIT-077
- Status: completed
- Change: UPDATE
