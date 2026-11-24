# UNIT-364 — Verify: Manifest file validity and scene coverage unit tests

## Summary
Unit tests that manifest.json passes the validator and covers scene refs.

## Description
Test that the real manifest.json parses via parseManifest and every asset path exists and every bedroom.yaml asset ref has an id.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/assetManifestFile.test.ts` · `new: describe('the-boys-room manifest.json')` · new
- **Do:** Read manifest.json with readFileSync and JSON.parse; assert parseManifest(...).ok is true; assert existsSync(join(publicDir, asset.path)) for each asset; load bedroom.yaml via the yaml package, collect object `asset` values and assert each is in the set of manifest ids; assert the character:boy entry has frames.frameCount 2 and animations.idle.

```
const result = parseManifest(JSON.parse(readFileSync(manifestPath,'utf8'))); expect(result.ok).toBe(true);
```

- **Run:** `cd game && npx vitest run tests/assetManifestFile.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Given manifest.json, when parseManifest runs, then ok is true
- Given each entry, when path is resolved, then the file exists
- Given bedroom.yaml asset refs, when matched, then each is a manifest id

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-364.md`

## Links
- Evidence: EVD-071
- Requirement: REQ-181
- Unit (Act): UNIT-361
- Unit (Verify): UNIT-364
- Status: completed
- Change: UPDATE
