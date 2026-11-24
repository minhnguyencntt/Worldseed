# UNIT-372 — Verify: Mocked-fs loader unit tests for valid, invalid and missing assets

## Summary
New tests/manifestLoaderMocked.test.ts

## Description
Write unit tests with node:fs fully mocked proving the loader paths in R1.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestLoaderMocked.test.ts` · `new: loadManifestFile with mocked fs` · new
- **Do:** Add vi.mock('node:fs', () => ({ readFileSync: vi.fn(), existsSync: vi.fn() })); tests: valid manifest JSON string with existsSync true gives ok true; JSON with a zero dimension gives ok false with path naming the dimension; readFileSync throwing gives error path 'manifest'; existsSync false gives error 'missing asset file'

```
vi.mocked(readFileSync).mockReturnValue(JSON.stringify(m)); vi.mocked(existsSync).mockReturnValue(true)
```

- **Run:** `npx vitest run tests/manifestLoaderMocked.test.ts`
- **Expected:** loadManifestFile tests pass

### Step 2 — `game/tests/manifestLoaderMocked.test.ts` · `new: loadManifestWithFallback with mocked fs` · new
- **Do:** Add tests: existsSync false for one of two assets gives missing length 1 and manifest.assets length 1; schema-invalid JSON gives empty manifest, errors non-empty and fallbackAssetId equal to FALLBACK_ASSET_ID; readFileSync throwing gives empty manifest and one error; call vi.resetAllMocks in beforeEach
- **Run:** `npx vitest run tests/manifestLoaderMocked.test.ts`
- **Expected:** Fallback tests pass and no real file is read

## Acceptance criteria
- Valid manifest returns ok
- Invalid and unreadable manifests produce errors and an empty fallback
- Missing asset appears in missing

## Definition of done
- Tests pass without touching disk
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-372.md`

## Links
- Evidence: EVD-073
- Requirement: REQ-185
- Unit (Act): UNIT-370
- Unit (Verify): UNIT-372
- Status: completed
- Change: UPDATE
