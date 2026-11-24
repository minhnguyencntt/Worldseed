# UNIT-617 — Verify: StoryPanel scene title, scroll and choice unit tests

## Summary
Unit tests for StoryPanel title, scroll classes, history, inventory and choice clicks

## Description
Add unit tests proving the StoryPanel rendering from state and choice clicks. No network is involved.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/storyPanelTitle.test.tsx` · `new: StoryPanel scene title and choices` · new
- **Do:** Render StoryPanel with sceneTitle 'The Boys Room', a two-choice DialogueNode built like introNode in tests/story.test.tsx, history ['a','b'], inventory ['key']; assert heading 'The Boys Room', the Story history list has 2 items, the Inventory region contains 'key', the root has class overflow-y-auto, and clicking the second choice calls onChoose with 1.
- **Run:** `cd game/frontend && npx vitest run tests/storyPanelTitle.test.tsx`
- **Expected:** All assertions pass

## Acceptance criteria
- Title heading asserted
- Scroll classes asserted
- Choice click calls onChoose with the index

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-617.md`

## Links
- Evidence: EVD-124
- Requirement: REQ-307
- Unit (Act): UNIT-614
- Unit (Verify): UNIT-617
- Status: completed
- Change: UPDATE
