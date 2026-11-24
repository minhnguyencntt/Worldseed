# UNIT-814 — Act: Point Vite publicDir at game/public

## Summary
Make the Vite entry serve the generated assets

## Description
Add publicDir to the Vite config so assets/ URLs used by BootScene reach game/public/assets.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/vite.config.ts` · `default defineConfig` · L6-L24
- **Do:** Add a publicDir property after plugins that resolves ../public from this file.

```
publicDir: fileURLToPath(new URL('../public', import.meta.url)),
```

- **Expected:** Vite serves game/public/assets/... at /assets/...

## Acceptance criteria
- vite.config.ts exports publicDir resolving to game/public
- Existing alias, server.fs and test config in vite.config.ts are unchanged

## Definition of done
- publicDir set
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-814.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-165
- Requirement: REQ-408
- Unit (Act): UNIT-814
- Unit (Verify): UNIT-818
- Status: completed
- Change: UPDATE
