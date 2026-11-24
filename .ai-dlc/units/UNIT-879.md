# UNIT-879 — Verify: StoryPanel dialog readability unit tests

## Summary
Assert StoryPanel root classes and choice/speaker classes.

## Description
Write tests/storyPanelReadable.test.tsx per R4 acceptance criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/storyPanelReadable.test.tsx` · `new: StoryPanel readable` · new
- **Do:** Render StoryPanel with a node {id:'n',speaker:'boy',text:'Hi',choices:[{text:'A'},{text:'B'}]}; expect container.firstChild toHaveClass('story-content') and not toHaveClass('h-full','text-sm'); getByRole('heading',{name:'boy'}) toHaveClass('font-pixel'); both buttons A and B toHaveClass('w-full').
- **Run:** `cd game/frontend && npx vitest run tests/storyPanelReadable.test.tsx tests/storyPanelDialogue.test.tsx`
- **Expected:** Both files pass.

## Acceptance criteria
- Root has story-content, no h-full or text-sm
- Choices are w-full and speaker has font-pixel

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-879.md`

## Links
- Evidence: EVD-174
- Requirement: REQ-439
- Unit (Act): UNIT-875
- Unit (Verify): UNIT-879
- Status: approved
- Change: UPDATE
