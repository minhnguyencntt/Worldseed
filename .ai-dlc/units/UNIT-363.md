# UNIT-363 — Verify: Asset folders and files unit tests

## Summary
Unit test that every required folder exists with real files.

## Description
Write a unit test that checks the folder structure under game/public/assets using the real filesystem read-only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/assetFolders.test.ts` · `new: describe('asset folders')` · new
- **Do:** Create the test with a FOLDERS array of the 9 relative dirs under game/public/assets (worlds/the-boys-room/backgrounds, furniture, objects, characters, effects, audio and ui/icons, frames, cursors). For each, assert readdirSync returns at least one entry with statSync size > 0. For each .svg found assert the text starts with '<svg'.

```
it.each(FOLDERS)('%s holds a real file', (dir) => { const files = readdirSync(join(root, dir)); expect(files.length).toBeGreaterThan(0); for (const f of files) expect(statSync(join(root, dir, f)).size).toBeGreaterThan(0); });
```

- **Run:** `cd game && npx vitest run tests/assetFolders.test.ts`
- **Expected:** All 9 folder cases and the svg-root case pass

## Acceptance criteria
- Given the 9 required folders, when each is read, then each has at least one non-empty file
- Given each svg, when read, then it begins with an svg root element

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-363.md`

## Links
- Evidence: EVD-071
- Requirement: REQ-180
- Unit (Act): UNIT-360
- Unit (Verify): UNIT-363
- Status: completed
- Change: UPDATE
