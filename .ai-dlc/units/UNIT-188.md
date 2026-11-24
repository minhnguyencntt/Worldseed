# UNIT-188 — Verify: Runner approval gate unit tests

## Summary
Unit tests for the gate with fake publisher

## Description
Write runner_gate_test.go reusing fakes to prove A3 against R3 criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_gate_test.go` · `TestRunGateBlocksPublish` · new
- **Do:** AutoPublish false, agent succeeds; Run; assert returned and stored Status == store.StatusAwaitingApproval, pub.calls==0, len(trees.removed)==0.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunGateBlocksPublish`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/runner/runner_gate_test.go` · `TestRunGateAutoPublish` · new
- **Do:** AutoPublish true; Run; assert Status COMPLETED, pub.calls==1 with workDir equal to filepath.Join(WorkRoot,"EXEC-1").
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunGateAutoPublish`
- **Expected:** Test passes

### Step 3 — `backend/worker/internal/runner/runner_gate_test.go` · `TestRunGatePublishError` · new
- **Do:** AutoPublish true, pub.err=errors.New("boom"); Run; assert err contains boom via errors.Is and stored Status FAILED.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunGatePublishError`
- **Expected:** Test passes

## Acceptance criteria
- Gate closed, so Publish is never called and status is AWAITING_APPROVAL
- Auto-publish success and publish failure each have a passing test

## Definition of done
- go test ./internal/runner -run TestRunGate passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-188.md`

## Links
- Evidence: EVD-038
- Requirement: REQ-094
- Unit (Act): UNIT-185
- Unit (Verify): UNIT-188
- Status: completed
- Change: UPDATE
