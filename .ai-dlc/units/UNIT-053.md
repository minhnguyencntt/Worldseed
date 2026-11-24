# UNIT-053 — Act: Declare @types/node and node types in tsconfig

## Summary
Add @types/node and enable node types for the frontend type-check

## Description
Add @types/node to devDependencies in game/frontend/package.json and add "node" to compilerOptions.types in game/frontend/tsconfig.json so layout.test.tsx type-checks.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `devDependencies` · L16-L27
- **Do:** Add the entry "@types/node": "^20.14.0" to devDependencies, placed first in alphabetical order before "@testing-library/jest-dom" is not required; insert after "@testing-library/user-event" line.

```
"@types/node": "^20.14.0",
```

- **Expected:** devDependencies lists @types/node; run npm install in game/frontend to install it.

### Step 2 — `game/frontend/tsconfig.json` · `compilerOptions.types` · L10
- **Do:** Change the types array to also include "node".

```
"types": ["vite/client", "vitest/globals"] -> "types": ["vite/client", "vitest/globals", "node"]
```

- **Expected:** TS2307 and TS2591 errors in tests/layout.test.tsx disappear.

## Acceptance criteria
- package.json devDependencies contains @types/node
- tsconfig.json types contains node
- tsc --noEmit exits 0

## Definition of done
- tsc --noEmit exits 0
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-053.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-011
- Requirement: REQ-027
- Unit (Act): UNIT-053
- Unit (Verify): UNIT-055
- Status: completed
- Change: UPDATE
