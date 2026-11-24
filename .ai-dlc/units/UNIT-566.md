# UNIT-566 — Act: Add phaser alias to game/vitest.config.ts

## Summary
Alias phaser to frontend install

## Description
Extend resolve.alias in game/vitest.config.ts with phaser pointing to ./frontend/node_modules/phaser.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/vitest.config.ts` · `default export resolve.alias` · L4
- **Do:** Add a second alias key phaser whose value is fileURLToPath(new URL('./frontend/node_modules/phaser', import.meta.url)) next to the @game key.

```
alias: { '@game': ..., phaser: fileURLToPath(new URL('./frontend/node_modules/phaser', import.meta.url)) }
```

- **Expected:** Config contains both aliases

## Acceptance criteria
- phaser alias present
- @game alias kept

## Definition of done
- alias added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-566.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-113
- Requirement: REQ-284
- Unit (Act): UNIT-566
- Unit (Verify): UNIT-569
- Status: approved
- Change: UPDATE
