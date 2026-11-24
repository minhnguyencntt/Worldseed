# UNIT-847 — Verify: Dialogue card, portrait and choices unit tests

## Summary
Unit tests for portraitPath and the StoryPanel dialogue card and choices.

## Description
TDD unit tests covering REQ1 acceptance criteria with no network; the manifest is the committed JSON file.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/storyPanelData.test.ts` · `new: portraitPath tests` · new
- **Do:** Add tests: portraitPath('boy') equals '/assets/worlds/the-boys-room/characters/boy-portrait.png' (value mirrors public/assets/worlds/the-boys-room/manifest.json entry character:boy-portrait, read from that file in the test, not hard-coded); portraitPath('ghost') is undefined.
- **Run:** `cd game/frontend && npx vitest run tests/storyPanelData.test.ts`
- **Expected:** Both tests pass.

### Step 2 — `game/frontend/tests/storyPanelDialogue.test.tsx` · `new: StoryPanel dialogue card` · new
- **Do:** Add jsdom tests rendering StoryPanel with a DialogueNode of speaker 'boy' and 2 choices: assert img with width 32 and src ending boy-portrait.png inside Dialogue region; speaker 'ghost' renders no img but shows speaker and text; click second button in Choices list calls vi.fn onChoose with 1; node undefined shows h1 and no Dialogue region; root has class sf-frame-panel.
- **Run:** `cd game/frontend && npx vitest run tests/storyPanelDialogue.test.tsx`
- **Expected:** All dialogue tests pass.

### Step 3 — `game/frontend/tests/storyPanelTitle.test.tsx` · `StoryPanel scene title and choices` · L1-L end
- **Do:** Update queries that relied on the old markup (choice buttons now inside the Choices list) so they still assert h1 title, history items and choice onChoose calls.
- **Run:** `cd game/frontend && npx vitest run tests/storyPanelTitle.test.tsx tests/story.test.tsx`
- **Expected:** Both files pass.

## Acceptance criteria
- Portrait present for boy and absent for unknown speaker
- Choice click calls onChoose with index
- No node renders no Dialogue region

## Definition of done
- Tests pass in seconds
- Existing title and story tests updated and green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-847.md`

## Links
- Evidence: EVD-170
- Requirement: REQ-422
- Unit (Act): UNIT-844
- Unit (Verify): UNIT-847
- Status: completed
- Change: UPDATE
