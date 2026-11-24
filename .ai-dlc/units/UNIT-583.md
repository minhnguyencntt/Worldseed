# UNIT-583 — Verify: Opening dialogue progression unit tests

## Summary
Intro text, choices and branches

## Description
Test dialogue progression through the real bedroom.yaml.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/dialogueProgression.test.ts` · `new: describe opening dialogue` · new
- **Do:** Build state with createInitialState(world, scene). Assert getActiveNode text equals "I don't know what to do next. What should we do?" and choices texts equal ['Look around the room', "Let's explore"]. chooseOption index 0: activeDialogue 'look-around', flags.looked_around true. Index 1 on a fresh state: 'explore', flags.exploring true. Choosing 0 on the follow-up node sets activeDialogue null.
- **Run:** `cd game/frontend && npx vitest run tests/dialogueProgression.test.ts`
- **Expected:** All assertions pass

## Acceptance criteria
- Intro text and choices exact
- Branches set flags and advance

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-583.md`

## Links
- Evidence: EVD-116
- Requirement: REQ-290
- Unit (Act): UNIT-579
- Unit (Verify): UNIT-583
- Status: completed
- Change: UPDATE
