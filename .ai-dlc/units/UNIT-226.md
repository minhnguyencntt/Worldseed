# UNIT-226 — Verify: Claude adapter unit tests with a fake Exec

## Summary
Unit tests for Claude.Run

## Description
Use a fake Exec recording its call.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/claude_test.go` · `new: TestClaudeRun` · new
- **Do:** Define fakeExec recording dir, name, args and returning a configurable error. TestClaudeRunCallsExec: NewClaude(fake), Run with dir D, assert name claude, dir D, len(args)>0, cost 0. TestClaudeRunWrapsError: fake returns errBoom, assert errors.Is(err, errBoom) and text contains claude. TestNewClaudeNilExec asserts an error.
- **Run:** `cd backend/worker && go test ./internal/provider -run 'TestClaude|TestNewClaude'`
- **Expected:** all three tests pass

## Acceptance criteria
- Exec receives dir, name claude and non-empty args
- Exec error is wrapped
- nil Exec is rejected

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-226.md`

## Links
- Evidence: EVD-044
- Requirement: REQ-112
- Unit (Act): UNIT-223
- Unit (Verify): UNIT-226
- Status: completed
- Change: UPDATE
