# UNIT-579 — Act: Author opening dialogue branches in bedroom.yaml

## Summary
Intro choices lead to look-around and explore nodes with flags

## Description
Give each intro choice a next node and set_flag events.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `dialogue intro choices` · L4-L11
- **Do:** Set choice 'Look around the room' to next: look-around with events set_flag looked_around true; set choice "Let's explore" to next: explore with events set_flag exploring true. Append nodes look-around (speaker boy, text 'There is a bookshelf, a computer, a bed, a window and a door.', one choice 'Okay') and explore (speaker boy, text 'Something in here must lead somewhere.', one choice 'Okay').
- **Expected:** Dialogue graph has three nodes and valid next ids

### Step 2 — `game/src/content/worlds/the-boys-room/world.yaml` · `flags` · L9-L11
- **Do:** Append flags looked_around and exploring.
- **Expected:** validateWorld finds no unknown flags

## Acceptance criteria
- Intro choice 0 goes to look-around and sets looked_around
- Intro choice 1 goes to explore and sets exploring

## Definition of done
- Branch nodes authored
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-579.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-116
- Requirement: REQ-290
- Unit (Act): UNIT-579
- Unit (Verify): UNIT-583
- Status: completed
- Change: UPDATE
