# UNIT-564 — Act: Add zod to game/frontend package.json

## Summary
Declare zod dependency in frontend

## Description
Add zod ^3.23.8 to dependencies of game/frontend/package.json, matching game/package.json.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies` · after tailwind-merge entry in dependencies
- **Do:** Insert the dependency entry zod with range ^3.23.8 after tailwind-merge, keeping alphabetical order, before yaml.

```
"yaml": "^2.5.0" -> "yaml": "^2.5.0",
    "zod": "^3.23.8"
```

- **Expected:** dependencies contains zod ^3.23.8

## Acceptance criteria
- zod ^3.23.8 appears in dependencies
- No other dependency changes

## Definition of done
- package.json lists zod
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-564.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-113
- Requirement: REQ-282
- Unit (Act): UNIT-564
- Unit (Verify): UNIT-567
- Status: approved
- Change: UPDATE
