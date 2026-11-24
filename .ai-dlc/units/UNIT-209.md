# UNIT-209 — Act: Add store.StatusRecovering

## Summary
Add the RECOVERING status constant to the store package.

## Description
Add StatusRecovering Status = "RECOVERING" beside the existing constants in backend/worker/internal/store/store.go so recovery can persist it.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/store/store.go` · `const block Status (StatusPending..StatusFailed)` · L20-L26
- **Do:** Add the constant StatusRecovering of type Status with value "RECOVERING" after StatusFailed.

```
StatusRecovering       Status = "RECOVERING"
```

- **Expected:** go build ./internal/store succeeds and store.StatusRecovering is usable.

## Acceptance criteria
- store.StatusRecovering equals the string RECOVERING
- Save and Get round-trip an Execution with that status

## Definition of done
- Constant exists and package builds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-209.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-042
- Requirement: REQ-106
- Unit (Act): UNIT-209
- Unit (Verify): UNIT-212
- Status: completed
- Change: NEW
