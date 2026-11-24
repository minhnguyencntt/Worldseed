# UNIT-168 — Verify: Round poller and expired-Round closer unit tests with mocked Git and clock

## Summary
Unit tests for detection, closing, snapshot immutability

## Description
Tests use a fake Git recording calls, a fixed clock and t.TempDir.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/internal/rounds/rounds_test.go` · `new: TestDetect_ScheduledAndClosed` · new
- **Do:** Write round.yaml files (fixture written by a helper that marshals rounds.Round, whose tags mirror backend round.Round) for SCHEDULED, OPEN, CLOSED; with fakeGit counting Pull, assert scheduled has 1 and closed has 1 entry and Pull was called once
- **Run:** `cd worker && go test ./internal/rounds -run TestDetect`
- **Expected:** Test passes

### Step 2 — `worker/internal/rounds/rounds_test.go` · `new: TestCloseExpired_FreezesSnapshot, TestCloseExpired_NotExpired, TestCloseExpired_ExistingSnapshot` · new
- **Do:** With Now fixed after EndsAt and fakeGit returning one Contribution and Head 'abc123': assert snapshot.yaml exists with Mode().Perm()==0o444, its prompt_sha256 equals sha256 of the prompt, round.yaml has status CLOSED, freeze_commit abc123 and closed_at set, and fakeGit.Commit received the snapshot path; with Now before EndsAt assert no files change; with a pre-existing snapshot.yaml assert error and contents unchanged
- **Run:** `cd worker && go test ./internal/rounds -run TestCloseExpired`
- **Expected:** All three tests pass

## Acceptance criteria
- Detection split asserted
- Snapshot mode 0444 and CLOSED round.yaml asserted
- Existing snapshot not overwritten
- Non-expired Round untouched

## Definition of done
- Tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-168.md`

## Links
- Evidence: EVD-035
- Requirement: REQ-083
- Unit (Act): UNIT-163
- Unit (Verify): UNIT-168
- Status: completed
- Change: UPDATE
