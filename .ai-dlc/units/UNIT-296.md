# UNIT-296 — Act: Add zustand to game/frontend package.json and package-lock.json

## Summary
Install zustand as a runtime dependency with npm.

## Description
Run npm install zustand in game/frontend so package.json dependencies and package-lock.json are updated together. No other dependency changes.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies` · L10-L21
- **Do:** Add the zustand runtime dependency by running npm install zustand inside game/frontend, which adds the entry to the dependencies object (not devDependencies).

```
cd game/frontend && npm install zustand
```

- **Expected:** package.json dependencies contains "zustand": "^<version>".

### Step 2 — `game/frontend/package-lock.json` · `packages[""].dependencies and packages["node_modules/zustand"]` · L8-L22
- **Do:** Confirm npm added zustand to the root package dependencies and created a node_modules/zustand entry; lockfileVersion stays 3 and no unrelated packages change.

```
git diff --stat game/frontend/package-lock.json
```

- **Expected:** Lockfile diff only adds zustand entries.

## Acceptance criteria
- Given the change, when package.json is read, then dependencies.zustand exists
- Given the change, when package-lock.json is read, then node_modules/zustand is resolved

## Definition of done
- zustand present in dependencies and lockfile
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-296.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-059
- Requirement: REQ-148
- Unit (Act): UNIT-296
- Unit (Verify): UNIT-297
- Status: completed
- Change: UPDATE
