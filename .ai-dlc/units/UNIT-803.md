# UNIT-803 — Verify: Boy manifest animations, sizes and generator unit tests

## Summary
Unit tests for generated entries and manifest declaration

## Description
Test generateAssets copies animations, PNG sizes via readPngSize, and ART_SOURCES entries are manifest-valid.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/boyManifest.test.ts` · `new: boy generated entries` · new
- **Do:** Call generateAssets(ART_SOURCES). Find entries character:boy-art and character:boy-portrait. Assert boy-art dimensions {448,48}, frames {32,48,14}, animations idle.frames [0,1,2,3], walk.frames length 6 starting 4, interact.frames [10..13], each with numeric frameRate, origin {0.5,1}; portrait dimensions {32,32}; readPngSize of each file bytes equals dimensions; parseManifest({version:1, assets: entries}) is ok; add a case with a source lacking animations producing an entry with no animations key.
- **Run:** `cd game/frontend && npx vitest run tests/boyManifest.test.ts`
- **Expected:** all boy manifest tests pass

## Acceptance criteria
- entry carries animations/origin
- sheet PNG 448x48, portrait 32x32
- ranges 0-3, 4-9, 10-13 with rates

## Definition of done
- test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-803.md`

## Links
- Evidence: EVD-163
- Requirement: REQ-401
- Unit (Act): UNIT-800
- Unit (Verify): UNIT-803
- Status: completed
- Change: UPDATE
