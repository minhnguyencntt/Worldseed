# UNIT-373 — Verify: Mocked-fs dangling reference unit tests

## Summary
New tests/manifestDanglingMocked.test.ts

## Description
Chain the mocked fallback loader into checkAssetRefs to prove dangling references are reported.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestDanglingMocked.test.ts` · `new: dangling refs after fallback load` · new
- **Do:** Mock node:fs; readFileSync returns a manifest with assets 'a' and 'b'; existsSync returns false only for b's path; load via loadManifestWithFallback; assert checkAssetRefs(result.manifest, ['a','b','ghost']) has 2 issues whose messages contain 'b' and 'ghost'; assert refs ['a'] returns []
- **Run:** `npx vitest run tests/manifestDanglingMocked.test.ts`
- **Expected:** Both tests pass

## Acceptance criteria
- Dropped and unknown ids are reported
- All-present refs yield no issues

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-373.md`

## Links
- Evidence: EVD-073
- Requirement: REQ-186
- Unit (Act): UNIT-371
- Unit (Verify): UNIT-373
- Status: completed
- Change: UPDATE
