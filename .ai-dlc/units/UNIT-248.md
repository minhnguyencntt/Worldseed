# UNIT-248 — Act: Delete ExecutionPanel.tsx

## Summary
Remove the ExecutionPanel component file

## Description
Delete game/frontend/src/components/ExecutionPanel.tsx, which renders the execution status, Approve, Retry and Reject buttons and the count.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ExecutionPanel.tsx` · `ExecutionPanel` · whole file
- **Do:** Delete the file with git rm; it exports only the ExecutionPanel component

```
git rm game/frontend/src/components/ExecutionPanel.tsx
```

- **Expected:** File is gone from the working tree

## Acceptance criteria
- ExecutionPanel.tsx no longer exists
- No other src file except AdminApp (handled separately) imports it

## Definition of done
- File deleted
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-248.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-049
- Requirement: REQ-124
- Unit (Act): UNIT-248
- Unit (Verify): UNIT-251
- Status: completed
- Change: UPDATE
