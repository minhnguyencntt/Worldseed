# UNIT-224 — Act: Implement the provider factory New

## Summary
Create provider.go with New selecting by kind

## Description
Create backend/worker/internal/provider/provider.go with New(kind string, e Exec) (Agent-compatible, error).

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/provider.go` · `new: Agent, New` · new
- **Do:** Declare interface Agent with Run(ctx context.Context, workDir string) (float64, error). Declare func New(kind string, e Exec) (Agent, error) with a switch: "mock" returns Mock{}, nil; "claude" returns NewClaude(e); default returns fmt.Errorf with text provider: unknown kind %q.

```
default: return nil, fmt.Errorf("provider: unknown kind %q", kind)
```

- **Expected:** go build ./internal/provider succeeds

## Acceptance criteria
- New returns Mock for mock
- New returns Claude for claude and an error for unknown kinds

## Definition of done
- package compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-224.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-044
- Requirement: REQ-113
- Unit (Act): UNIT-224
- Unit (Verify): UNIT-227
- Status: completed
- Change: UPDATE
