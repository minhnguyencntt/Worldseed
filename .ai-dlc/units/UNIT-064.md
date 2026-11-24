# UNIT-064 — Verify: Git CLI committer unit tests

## Summary
Unit tests proving the Committer CLI implementation uses the configured bot identity.

## Description
Unit tests written from the requirement spec with a fake command runner only. Context: a Committer interface with a CLI implementation using the configured bot identity. Expected result: all listed tests pass.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/gitrepo/gitrepo_test.go` · `TestCommit_RunsAddThenCommit` · new
- **Do:** Write test TestCommit_RunsAddThenCommit: fake Runner capturing args; Commit(ctx, ["worlds/a.md"], "msg"); assert call 1 is add -- worlds/a.md and call 2 contains user.name=bot, user.email=bot@x and commit -m msg.
- **Run:** `cd backend && go test ./internal/gitrepo`
- **Expected:** Test passes

### Step 2 — `backend/internal/gitrepo/gitrepo_test.go` · `TestCommit_AddFailureSkipsCommit` · new
- **Do:** Write test TestCommit_AddFailureSkipsCommit: fake Runner errors on add; assert 1 call and non-nil error.
- **Run:** `cd backend && go test ./internal/gitrepo`
- **Expected:** Test passes

### Step 3 — `backend/internal/gitrepo/gitrepo_test.go` · `TestCommit_RejectsBadPaths` · new
- **Do:** Write test TestCommit_RejectsBadPaths: empty slice, "../x" and "/abs" return errors with zero runner calls.
- **Run:** `cd backend && go test ./internal/gitrepo`
- **Expected:** Test passes

## Acceptance criteria
- Given a CLI committer, when Commit runs, then it executes git add -- <path> then git commit with the bot name and email in the working dir
- Given the runner fails on add, when Commit runs, then commit is not executed and the error is returned
- Given an empty path list or a path with .., when Commit runs, then an error is returned and no command runs

## Definition of done
- Listed tests pass via the unit command
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-064.md`

## Links
- Evidence: EVD-012
- Requirement: REQ-031
- Unit (Act): UNIT-059
- Unit (Verify): UNIT-064
- Status: completed
- Change: UPDATE
