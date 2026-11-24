# UNIT-370 — Act: Confirm loader reads fs only through node:fs named imports

## Summary
Ensure loadManifestFile/Fallback use mockable readFileSync and existsSync

## Description
The loader already imports existsSync and readFileSync from node:fs and join from node:path, so vi.mock('node:fs') can intercept them. Confirm no other fs access exists; no code change is expected.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/loaders/manifestLoader.ts` · `loadManifestFile, loadManifestWithFallback` · L1-L2
- **Do:** Confirm the only I/O imports are existsSync and readFileSync from 'node:fs' and make no edit if so
- **Expected:** Both functions use only these two fs calls

## Acceptance criteria
- Loader imports only readFileSync and existsSync from node:fs
- No other I/O or clock use exists in the loader

## Definition of done
- Loader confirmed mockable
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-370.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-073
- Requirement: REQ-185
- Unit (Act): UNIT-370
- Unit (Verify): UNIT-372
- Status: completed
- Change: UPDATE
