# UNIT-225 — Verify: Mock agent unit tests

## Summary
Unit tests for Mock.Run

## Description
Test the Mock marker file, cost and context handling using t.TempDir.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/mock_test.go` · `new: TestMockRunWritesMarker` · new
- **Do:** Call Mock{}.Run(context.Background(), t.TempDir()); assert cost 0, nil error, and that MOCK-EXECUTION.md read from the dir contains the text MOCK. Add TestMockRunCancelled with an already cancelled context asserting errors.Is(err, context.Canceled) and that the file does not exist. Add a compile-time check var _ runner.Agent = Mock{} importing the runner package.
- **Run:** `cd backend/worker && go test ./internal/provider -run 'TestMockRun'`
- **Expected:** both tests pass

## Acceptance criteria
- Marker file contains MOCK
- Cancelled context returns an error and writes nothing

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-225.md`

## Links
- Evidence: EVD-044
- Requirement: REQ-111
- Unit (Act): UNIT-222
- Unit (Verify): UNIT-225
- Status: completed
- Change: UPDATE
