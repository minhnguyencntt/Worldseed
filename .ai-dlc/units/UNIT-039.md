# UNIT-039 — Verify: IntroScreen and StoryPanel unit tests

## Summary
Verify: IntroScreen and StoryPanel unit tests

## Description
Unit tests written from the requirement spec with storage and DOM faked via jsdom; no server or browser is started.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/story.test.tsx` · `intro copy and choices` · new
- **Do:** Render IntroScreen and assert text 'You decide.' and 'Begin' click calls onBegin. Render StoryPanel with the 'intro' node from scene.dialogue, click the first choice button, assert onChoose called with 0; render with inventory [] and assert 'Empty', then with ['key'] assert 'key'.
- **Run:** `cd game/frontend && npx vitest run tests/story.test.tsx`
- **Expected:** Test passes

## Acceptance criteria
- Tests fail without the Act and pass with it
- Each test maps to a requirement acceptance criterion

## Definition of done
- Listed tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-039.md`

## Links
- Evidence: EVD-007
- Requirement: REQ-019
- Unit (Act): UNIT-035
- Unit (Verify): UNIT-039
- Status: completed
- Change: UPDATE
