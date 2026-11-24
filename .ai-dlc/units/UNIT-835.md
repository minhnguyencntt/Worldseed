# UNIT-835 — Verify: Fonts are npm packages imported locally with no URLs

## Summary
Static unit test of fonts

## Description
Read package.json and sources from disk and assert fonts are local.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/fonts.test.ts` · `new: describe('bundled fonts')` · new
- **Do:** Test 1: read package.json with readFileSync and assert dependencies has @fontsource/press-start-2p and @fontsource/vt323. Test 2: read src/main.tsx and assert it contains both '@fontsource/press-start-2p/400.css' and '@fontsource/vt323/400.css'. Test 3: read src/styles.css, index.html and src/lib/tokens.ts and assert none matches /https?:\/\/[^\s'"]*font/i or 'fonts.googleapis'.
- **Run:** `npx vitest run tests/fonts.test.ts`
- **Expected:** All three tests pass

## Acceptance criteria
- Dependencies include both packages
- No font URL exists in src or index.html

## Definition of done
- fonts.test.ts passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-835.md`

## Links
- Evidence: EVD-168
- Requirement: REQ-416
- Unit (Act): UNIT-831
- Unit (Verify): UNIT-835
- Status: completed
- Change: UPDATE
