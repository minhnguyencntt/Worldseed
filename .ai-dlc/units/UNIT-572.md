# UNIT-572 — Act: Add @game paths mapping to game/tsconfig.json

## Summary
Map @game/* to ./src/* in the game tsconfig.

## Description
Add compilerOptions.paths so tsc resolves the alias already defined in vitest.config.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tsconfig.json` · `compilerOptions` · L1
- **Do:** Add a 'paths' key with '@game/*' mapped to ['./src/*'] to compilerOptions

```
"paths":{"@game/*":["./src/*"]}
```

- **Expected:** tsconfig lists the @game/* path mapping

## Acceptance criteria
- compilerOptions.paths['@game/*'] is ['./src/*']
- Other compiler options are unchanged

## Definition of done
- paths entry added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-572.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-115
- Requirement: REQ-286
- Unit (Act): UNIT-572
- Unit (Verify): UNIT-575
- Status: completed
- Change: UPDATE
