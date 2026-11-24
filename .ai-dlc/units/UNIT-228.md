# UNIT-228 — Act: Add restricted-permission flags to Claude.Run

## Summary
Build the claude args with permission mode and tool allow/deny lists

## Description
Replace the inline []string{"-p", claudePrompt} in Claude.Run with a package-level builder claudeArgs() returning flags that restrict the CLI.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/claude.go` · `new: claudeArgs` · after L14
- **Do:** Add function claudeArgs() []string returning -p, claudePrompt, --permission-mode, acceptEdits, --allowedTools, Read,Edit,Write,Glob,Grep, --disallowedTools, Bash,WebFetch,WebSearch.

```
func claudeArgs() []string {
	return []string{"-p", claudePrompt, "--permission-mode", "acceptEdits", "--allowedTools", "Read,Edit,Write,Glob,Grep", "--disallowedTools", "Bash,WebFetch,WebSearch"}
}
```

- **Expected:** Package compiles with claudeArgs defined.

### Step 2 — `backend/worker/internal/provider/claude.go` · `Claude.Run` · L33-L38
- **Do:** Change the Exec call to pass claudeArgs() instead of the inline []string{"-p", claudePrompt}.

```
c.exec.Run(ctx, workDir, "claude", []string{"-p", claudePrompt}) -> c.exec.Run(ctx, workDir, "claude", claudeArgs())
```

- **Expected:** Exec receives the restricted flag list.

## Acceptance criteria
- Run passes --permission-mode acceptEdits
- Run passes --disallowedTools Bash,WebFetch,WebSearch and an --allowedTools list without Bash

## Definition of done
- Run uses claudeArgs()
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-228.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-045
- Requirement: REQ-114
- Unit (Act): UNIT-228
- Unit (Verify): UNIT-230
- Status: completed
- Change: NEW
