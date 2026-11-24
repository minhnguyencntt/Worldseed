# UNIT-030 — Act: Fix .gitignore node_modules path for game/

## Summary
Replace stale backend/game/node_modules/ ignore line

## Description
Context: .gitignore line 10 reads backend/game/node_modules/. Desired behavior: it reads game/node_modules/. Expected result: installing deps in game/ leaves a clean git status. Why: avoid tracking dependencies.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `.gitignore` · `ignore rule backend/game/node_modules/` · L10
- **Do:** Replace the line backend/game/node_modules/ with game/node_modules/.

```
backend/game/node_modules/ -> game/node_modules/
```

- **Expected:** grep -n 'node_modules' .gitignore shows game/node_modules/ and no backend/game

## Acceptance criteria
- Given .gitignore, when read, then line game/node_modules/ is present
- Given .gitignore, when read, then backend/game does not appear

## Definition of done
- .gitignore updated
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-030.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-006
- Requirement: REQ-016
- Unit (Act): UNIT-030
- Unit (Verify): UNIT-032
- Status: completed
- Change: UPDATE
