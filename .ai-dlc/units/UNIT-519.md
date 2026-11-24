# UNIT-519 — Act: Add @game alias to game/vitest.config.ts

## Summary
Resolve @game to game/src in the game vitest config

## Description
Context: game/vitest.config.ts is only defineConfig({test:{include}}). BootScene imports @game/*. Add the alias only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/vitest.config.ts` · `default export defineConfig` · L1-L3
- **Do:** Import fileURLToPath and URL from node:url and add resolve.alias with key @game pointing to the src directory, keeping the test.include entry

```
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({ resolve: { alias: { '@game': fileURLToPath(new URL('./src', import.meta.url)) } }, test: { include: ['tests/**/*.test.ts'] } });
```

- **Expected:** Config exposes @game alias and unchanged include

## Acceptance criteria
- Given the config, when read, then resolve.alias['@game'] is the absolute path of game/src
- Given the config, when read, then include is still tests/**/*.test.ts

## Definition of done
- Alias added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-519.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-105
- Requirement: REQ-260
- Unit (Act): UNIT-519
- Unit (Verify): UNIT-522
- Status: completed
- Change: NEW
