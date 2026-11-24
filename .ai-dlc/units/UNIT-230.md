# UNIT-230 — Verify: Claude restricted-permission flag unit tests

## Summary
Fake Exec proves the restriction flags

## Description
Add tests to claude_test.go using the existing recordingExec.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/claude_test.go` · `new: TestClaudeRunRestrictsPermissions` · after L101
- **Do:** Run the adapter with recordingExec and workDir /tmp/w; assert the arg after --permission-mode is acceptEdits, the arg after --disallowedTools contains Bash, and the arg after --allowedTools does not contain Bash.
- **Run:** `cd backend/worker && go test ./internal/provider -run TestClaudeRunRestrictsPermissions`
- **Expected:** Test passes.

## Acceptance criteria
- Args contain --permission-mode acceptEdits
- Bash is denied and not allowed

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-230.md`

## Links
- Evidence: EVD-045
- Requirement: REQ-114
- Unit (Act): UNIT-228
- Unit (Verify): UNIT-230
- Status: completed
- Change: UPDATE
