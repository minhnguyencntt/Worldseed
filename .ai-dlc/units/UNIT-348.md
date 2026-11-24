# UNIT-348 — Act: Add zod to game/package.json

## Summary
Declare zod dependency

## Description
Add zod to the dependencies of game/package.json and install it so lockfile is updated.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/package.json` · `dependencies` · L1
- **Do:** Add the key "zod": "^3.23.8" to dependencies next to yaml, then run npm install in game/ to update package-lock.json

```
"dependencies":{"yaml":"^2.5.0"} -> "dependencies":{"yaml":"^2.5.0","zod":"^3.23.8"}
```

- **Expected:** zod is listed in dependencies and installed in game/node_modules

## Acceptance criteria
- dependencies contains zod ^3.23.8
- yaml dependency remains

## Definition of done
- zod resolves from game/
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-348.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-069
- Requirement: REQ-174
- Unit (Act): UNIT-348
- Unit (Verify): UNIT-351
- Status: completed
- Change: NEW
