# UNIT-810 — Verify: Boy manifest animations, sizes and generator unit tests

## Summary
Unit tests for animations/origin copy and boy registration

## Description
Test generateAssets with and without new fields and the boy entries from ART_SOURCES.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/boyManifest.test.ts` · `new: generator animations and origin` · new
- **Do:** Create tests: (1) a two-frame inline ArtSource with animations {idle:{frames:[0,1],frameRate:2,repeat:-1}} and origin {x:0.5,y:1} through generateAssets gives an entry with equal animations and origin; (2) a source without them gives an entry where 'animations' and 'origin' are not in the entry; (3) ART_SOURCES ids contain 'character:boy-sheet' and 'character:boy-portrait' once each; (4) entries from generateAssets(BOY_SOURCES) give sheet dimensions 448x48, frameCount 14, animations idle [0..3], walk [4..9], interact [10..13] with positive frameRate, portrait dimensions 32x32; (5) parseManifest({version:1,assets:entries}).ok is true.
- **Run:** `cd game/frontend && npx vitest run tests/boyManifest.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Animations and origin copied
- Boy ids registered
- Entries validate

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-810.md`

## Links
- Evidence: EVD-164
- Requirement: REQ-404
- Unit (Act): UNIT-806
- Unit (Verify): UNIT-810
- Status: completed
- Change: NEW
