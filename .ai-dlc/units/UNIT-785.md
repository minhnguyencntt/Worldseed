# UNIT-785 — Verify: runGenerateArt identical bytes and npm script unit tests

## Summary
Unit tests for the script core and package.json

## Description
Tests with fake IO for runGenerateArt and a read of package.json.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/generateArtScript.test.ts` · `new: two runs give identical bytes` · new
- **Do:** Create a fake io storing writes in a Map; call runGenerateArt twice with a manifest text '{"version":1,"assets":[]}'; assert every binary entry from run 1 equals the same path from run 2.
- **Run:** `cd game/frontend && npx vitest run tests/generateArtScript.test.ts`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/generateArtScript.test.ts` · `new: manifest sizes match PNG headers` · new
- **Do:** Parse the written manifest; for each ART_SOURCES entry assert dimensions equal readPngSize of the bytes at assetsRoot/path, and the text ends with a newline.
- **Run:** `cd game/frontend && npx vitest run tests/generateArtScript.test.ts`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/generateArtScript.test.ts` · `new: npm script registered` · new
- **Do:** Read ../package.json and assert scripts['art:generate'] === 'vite-node scripts/generateArt.ts'.
- **Run:** `cd game/frontend && npx vitest run tests/generateArtScript.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- Two runs write identical bytes
- Manifest written holds entry per source and matches PNG headers
- art:generate script exists

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-785.md`

## Links
- Evidence: EVD-159
- Requirement: REQ-392
- Unit (Act): UNIT-782
- Unit (Verify): UNIT-785
- Status: completed
- Change: UPDATE
