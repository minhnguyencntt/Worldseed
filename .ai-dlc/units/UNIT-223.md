# UNIT-223 — Act: Implement the Claude CLI adapter

## Summary
Create claude.go with Exec interface and Claude.Run

## Description
Create backend/worker/internal/provider/claude.go with Exec, Claude, NewClaude and Run that calls Exec with fixed args.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/claude.go` · `new: Exec, Claude, NewClaude, Claude.Run` · new
- **Do:** Declare interface Exec with Run(ctx context.Context, dir, name string, args []string) error. Declare const claudePrompt as a fixed instruction to implement the structured tasks in development/tasks. Declare type Claude struct{exec Exec}, NewClaude(e Exec) (*Claude, error) returning an error when e is nil, and (*Claude).Run(ctx, workDir) that calls exec.Run(ctx, workDir, "claude", []string{"-p", claudePrompt}) and returns 0 with the error wrapped as provider claude, or 0 and nil.

```
args := []string{"-p", claudePrompt}
```

- **Expected:** go build ./internal/provider succeeds

## Acceptance criteria
- Claude.Run calls Exec with name claude and constant args
- Exec errors are wrapped

## Definition of done
- package compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-223.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-044
- Requirement: REQ-112
- Unit (Act): UNIT-223
- Unit (Verify): UNIT-226
- Status: completed
- Change: UPDATE
