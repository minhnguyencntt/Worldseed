# UNIT-369 — Verify: loadManifestWithFallback unit tests

## Summary
Unit tests for fallback loading with temp dir

## Description
Test missing-file reporting and non-throwing fallback using a temp directory.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestFallback.test.ts` · `new: describe('loadManifestWithFallback')` · new
- **Do:** Using mkdtempSync like game/tests/manifestLoader.test.ts L23-L31: (1) manifest with assets a.svg (file written) and b.svg (not written): expect manifest.assets ids ['a'], missing [{id:'b',path:'b.svg'}], fallbackAssetId FALLBACK_ASSET_ID; (2) nonexistent manifest path: expect assets [] and errors.length 1, no throw; (3) invalid JSON: same; (4) all files present: missing [].
- **Run:** `cd game && npx vitest run tests/manifestFallback.test.ts`
- **Expected:** 4 tests pass.

## Acceptance criteria
- Missing asset reported and dropped
- Bad manifest yields empty manifest and errors
- Complete manifest has no missing

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-369.md`

## Links
- Evidence: EVD-072
- Requirement: REQ-184
- Unit (Act): UNIT-367
- Unit (Verify): UNIT-369
- Status: completed
- Change: UPDATE
