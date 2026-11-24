# UNIT-035 — Act: Build IntroScreen and StoryPanel

## Summary
Act: Build IntroScreen and StoryPanel

## Description
Implement the narrative panel and opening screen.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/IntroScreen.tsx` · `new: IntroScreen` · new
- **Do:** Export IntroScreen({onBegin}) rendering paragraphs 'Every great adventure begins with a question.', "I'm just a boy in my room. I don't know what happens next.", 'You decide.', 'What should I do?' and a button 'Begin' calling onBegin.
- **Expected:** Intro copy and Begin button visible

### Step 2 — `game/frontend/src/components/StoryPanel.tsx` · `new: StoryPanel` · new
- **Do:** Export StoryPanel({node, history, inventory, onChoose}). Render node speaker and text with one button per node.choices calling onChoose(index) when node defined; an ol aria-label='Story history' listing history; a section 'Inventory' listing items or the text 'Empty'.
- **Expected:** Panel shows dialogue, choices, history and inventory

## Acceptance criteria
- Code compiles under tsc --noEmit strict
- Behavior matches the requirement acceptance criteria

## Definition of done
- Files in code_paths implemented and type-check passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-035.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-007
- Requirement: REQ-019
- Unit (Act): UNIT-035
- Unit (Verify): UNIT-039
- Status: completed
- Change: NEW
