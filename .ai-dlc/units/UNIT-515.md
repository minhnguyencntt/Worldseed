# UNIT-515 — Act: Add @game alias to game/vitest.config.ts

## Summary
Let game/tests import frontend BootScene which uses '@game/*' imports

## Description
BootScene imports '@game/engine/planPreload' etc. The game vitest config has no alias, so importing it from game/tests fails. Add the alias mirroring game/frontend/vitest.config.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/vitest.config.ts` · `default export defineConfig` · L1-L2
- **Do:** Add import { fileURLToPath, URL } from 'node:url' and add resolve.alias '@game' pointing to fileURLToPath(new URL('./src', import.meta.url)) beside the existing test block.

```
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { alias: { '@game': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: { include: ['tests/**/*.test.ts'] },
});
```

- **Expected:** '@game/...' imports resolve in game/tests

## Acceptance criteria
- '@game/engine/planPreload' resolves to game/src/engine/planPreload under game's vitest
- Include pattern tests/**/*.test.ts stays unchanged

## Definition of done
- Alias present and existing game tests unaffected
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-515.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-104
- Requirement: REQ-258
- Unit (Act): UNIT-515
- Unit (Verify): UNIT-517
- Status: approved
- Change: UPDATE
