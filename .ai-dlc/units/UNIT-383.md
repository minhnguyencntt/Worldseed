# UNIT-383 — Verify: Committed manifest paths vs present files with fs mocked unit tests

## Summary
Unit tests for findMissingAssetPaths using the committed manifest read through mocked node:fs.

## Description
New test file tests/manifestFilesMocked.test.ts mocks node:fs, serves the committed manifest.json text via the mock, and asserts the helper against a file list.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestFilesMocked.test.ts` · `new: committed manifest paths are all in the file list` · new
- **Do:** Create the test: mock node:fs with readFileSync returning the committed manifest.json text (obtained via vi.importActual in the mock factory) and existsSync mocked; call parseManifest on JSON.parse(readFileSync(...)); build files = manifest.assets.map(a=>a.path); assert findMissingAssetPaths(manifest, files) equals [].
- **Run:** `cd game && npx vitest run tests/manifestFilesMocked.test.ts`
- **Expected:** Test passes; helper returns [].

### Step 2 — `game/tests/manifestFilesMocked.test.ts` · `new: reports a path missing from the file list` · new
- **Do:** Add test: remove 'worlds/the-boys-room/furniture/bed.svg' from files; assert findMissingAssetPaths returns ['worlds/the-boys-room/furniture/bed.svg']. Add test that the manifest has at least one asset so the check is not vacuous.
- **Run:** `cd game && npx vitest run tests/manifestFilesMocked.test.ts`
- **Expected:** All tests in the file pass.

## Acceptance criteria
- Full list yields no missing paths
- List missing one path yields exactly that path
- fs is mocked and no asset file is read

## Definition of done
- Test file passes via vitest filter
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-383.md`

## Links
- Evidence: EVD-076
- Requirement: REQ-191
- Unit (Act): UNIT-382
- Unit (Verify): UNIT-383
- Status: completed
- Change: UPDATE
