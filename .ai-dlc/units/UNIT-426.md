# UNIT-426 — Act: Replace game/node_modules/ with node_modules/ in .gitignore

## Summary
Edit the node_modules ignore rule

## Description
Change the last line of .gitignore from `game/node_modules/` to `node_modules/`.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `.gitignore` · `game/node_modules/ rule` · L11
- **Do:** Replace the line `game/node_modules/` with `node_modules/` leaving all .devion lines untouched

```
game/node_modules/ -> node_modules/
```

- **Expected:** .gitignore ends with the line node_modules/

## Acceptance criteria
- Given the edited .gitignore, then it contains `node_modules/` exactly once
- Given the edited .gitignore, then `game/node_modules/` is absent

## Definition of done
- Rule replaced
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-426.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-086
- Requirement: REQ-213
- Unit (Act): UNIT-426
- Unit (Verify): UNIT-428
- Status: completed
- Change: UPDATE
