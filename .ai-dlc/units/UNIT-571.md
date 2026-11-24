# UNIT-571 — Verify: game vitest config phaser alias unit tests

## Summary
Add the phaser alias to the test config and assert it

## Description
This Verify unit owns the change to game/vitest.config.ts (a test configuration) and adds the test that asserts the alias, so Act is not rejected for touching test files.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/vitest.config.ts` · `default defineConfig resolve.alias` · L4
- **Do:** Add a 'phaser' entry to resolve.alias next to '@game', computed with fileURLToPath(new URL('./frontend/node_modules/phaser', import.meta.url))

```
alias: { '@game': fileURLToPath(new URL('./src', import.meta.url)), phaser: fileURLToPath(new URL('./frontend/node_modules/phaser', import.meta.url)) }
```

- **Run:** `cd game && npx vitest run tests/vitestPhaserAlias.test.ts`
- **Expected:** Config exposes both aliases

### Step 2 — `game/tests/vitestPhaserAlias.test.ts` · `new: vitest phaser alias` · new
- **Do:** Create a test that imports the default export of '../vitest.config' and asserts config.resolve.alias.phaser ends with 'frontend/node_modules/phaser' and config.resolve.alias['@game'] ends with '/src'; also assert BootScene.ts source read from disk contains "import Phaser from 'phaser'"

```
expect((config.resolve!.alias as Record<string,string>).phaser).toMatch(/frontend\/node_modules\/phaser$/);
```

- **Run:** `cd game && npx vitest run tests/vitestPhaserAlias.test.ts`
- **Expected:** All alias tests pass

## Acceptance criteria
- Given the config, when its alias is read, then phaser maps to game/frontend/node_modules/phaser
- Given the config, when its alias is read, then @game still maps to game/src

## Definition of done
- Alias added and alias test green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-571.md`

## Links
- Evidence: EVD-114
- Requirement: REQ-285
- Unit (Act): UNIT-570
- Unit (Verify): UNIT-571
- Status: completed
- Change: UPDATE
