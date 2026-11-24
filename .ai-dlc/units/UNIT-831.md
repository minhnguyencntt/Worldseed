# UNIT-831 — Act: Add @fontsource pixel font packages and import them in main.tsx

## Summary
npm font packages imported locally

## Description
Add press-start-2p and vt323 packages and import their css.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies` · L14-L27
- **Do:** Run npm install @fontsource/press-start-2p @fontsource/vt323 in game/frontend so both appear in dependencies and package-lock.json is updated; do not touch the phaser ~3.90.0 entry.
- **Run:** `npm install @fontsource/press-start-2p @fontsource/vt323`
- **Expected:** package.json lists both packages alphabetically among dependencies

### Step 2 — `game/frontend/src/main.tsx` · `module imports` · after L3
- **Do:** Add imports '@fontsource/press-start-2p/400.css' and '@fontsource/vt323/400.css' before the './styles.css' import.

```
import '@fontsource/press-start-2p/400.css';
import '@fontsource/vt323/400.css';
```

- **Expected:** main.tsx imports both css files

## Acceptance criteria
- Both packages in dependencies
- main.tsx imports their 400.css

## Definition of done
- npm install resolves; fonts imported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-831.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-168
- Requirement: REQ-416
- Unit (Act): UNIT-831
- Unit (Verify): UNIT-835
- Status: completed
- Change: UPDATE
