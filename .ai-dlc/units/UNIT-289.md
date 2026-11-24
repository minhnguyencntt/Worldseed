# UNIT-289 — Verify: Tailwind config, PostCSS config and stylesheet tokens unit tests

## Summary
Unit tests for Tailwind/PostCSS config files and styles.css

## Description
Write tests from REQ1 acceptance criteria that import the config and read files from disk; no server or browser.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/tailwindConfig.test.ts` · `new: describe('Tailwind configuration')` · new
- **Do:** Add test 'config exposes content globs and token colors': import default from ../tailwind.config, assert content toEqual ['./index.html','./src/**/*.{ts,tsx}'] and theme.extend.colors.background toBe 'hsl(var(--background))' and primary.DEFAULT toBe 'hsl(var(--primary))'
- **Run:** `cd game/frontend && npx vitest run tests/tailwindConfig.test.ts -t 'config exposes'`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/tailwindConfig.test.ts` · `it('postcss registers tailwind')` · new
- **Do:** Import default from ../postcss.config.js and assert Object.keys(plugins) toEqual ['tailwindcss','autoprefixer']
- **Run:** `cd game/frontend && npx vitest run tests/tailwindConfig.test.ts -t 'postcss'`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/tailwindConfig.test.ts` · `it('styles.css has directives and tokens')` · new
- **Do:** Read src/styles.css via readFileSync(join(process.cwd(),'src','styles.css')); assert it contains '@tailwind base', '@tailwind components', '@tailwind utilities', '--background:', '--foreground:', '--primary:', '.game-layout' and '.story-panel'
- **Run:** `cd game/frontend && npx vitest run tests/tailwindConfig.test.ts -t 'styles.css'`
- **Expected:** Test passes

## Acceptance criteria
- Given the config, when imported, then content globs and token colors match
- Given styles.css, when read, then directives, tokens and old rules are present

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-289.md`

## Links
- Evidence: EVD-057
- Requirement: REQ-143
- Unit (Act): UNIT-286
- Unit (Verify): UNIT-289
- Status: completed
- Change: UPDATE
