# UNIT-059 — Act: Implement the Git CLI committer interface

## Summary
A Committer interface with a CLI implementation using the configured bot identity.

## Description
Context: contributions must be committed to Git. Desired behavior: gitrepo.Committer interface with a CLI implementation that runs git add and git commit with -c user.name/user.email set from the bot config via an injectable command runner. Expected result: tests mock the runner. Why: credentials never leave the backend and tests need no Git.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/gitrepo/gitrepo.go` · `new: Committer, Runner, CLI, Commit` · new
- **Do:** Create package gitrepo with interface Committer{Commit(ctx context.Context, paths []string, message string) error}; type Runner func(ctx context.Context, dir string, args ...string) ([]byte, error) defaulting to exec.CommandContext("git", args...) with Dir set; CLI{Dir, BotName, BotEmail string; Run Runner}. Commit rejects empty paths or any path that is absolute or contains "..", runs ["add","--",paths...], then ["-c","user.name="+BotName,"-c","user.email="+BotEmail,"commit","-m",message,"--",paths...], wrapping errors with the command name.
- **Expected:** Commit issues exactly two commands in order and returns the first failure

## Acceptance criteria
- Given a CLI committer, when Commit runs, then it executes git add -- <path> then git commit with the bot name and email in the working dir
- Given the runner fails on add, when Commit runs, then commit is not executed and the error is returned
- Given an empty path list or a path with .., when Commit runs, then an error is returned and no command runs

## Definition of done
- Product code compiles with go build ./...
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-059.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-012
- Requirement: REQ-031
- Unit (Act): UNIT-059
- Unit (Verify): UNIT-064
- Status: completed
- Change: UPDATE
