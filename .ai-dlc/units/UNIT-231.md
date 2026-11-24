# UNIT-231 — Verify: Claude fixed prompt and empty workDir unit tests

## Summary
Fake Exec proves fixed input and workDir guard

## Description
Add two tests to claude_test.go using recordingExec.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/claude_test.go` · `new: TestClaudeRunRejectsEmptyWorkDir` · after L101
- **Do:** Call Run with workDir "  " on a recordingExec; assert error contains "work dir", fake.called is false and cost is 0.
- **Run:** `cd backend/worker && go test ./internal/provider -run TestClaudeRunRejectsEmptyWorkDir`
- **Expected:** Test passes.

### Step 2 — `backend/worker/internal/provider/claude_test.go` · `new: TestClaudeRunUsesFixedPrompt` · after L101
- **Do:** Call Run with workDir /tmp/secret-dir; assert the arg following -p equals claudePrompt and no arg contains the string secret-dir.
- **Run:** `cd backend/worker && go test ./internal/provider -run TestClaudeRunUsesFixedPrompt`
- **Expected:** Test passes.

## Acceptance criteria
- Empty workDir errors without Exec call
- Arg after -p equals claudePrompt and no arg contains the workDir

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-231.md`

## Links
- Evidence: EVD-045
- Requirement: REQ-115
- Unit (Act): UNIT-229
- Unit (Verify): UNIT-231
- Status: completed
- Change: UPDATE
