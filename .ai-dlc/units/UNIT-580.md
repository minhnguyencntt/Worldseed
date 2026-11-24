# UNIT-580 — Act: Add contextual action events for bed, computer, window and door

## Summary
State-changing events including old-key inventory item

## Description
Edit action events in bedroom.yaml so each key object changes flags, inventory or history.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `bed actions` · L19-L28
- **Do:** Add action id search label Search with events add_item old-key and show_text 'Under the pillow you find an old key.'.
- **Expected:** performAction(bed, search) adds old-key

### Step 2 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `window and door actions` · L99-L132
- **Do:** Window inspect: append set_flag window_seen true. Door: replace leave events [] with conditions [{hasItem: old-key}] and events set_flag door_unlocked true plus show_text 'The old key turns in the lock.'.
- **Expected:** Door leave only runs with old-key

### Step 3 — `game/src/content/worlds/the-boys-room/world.yaml` · `flags` · L9-L11
- **Do:** Append window_seen and door_unlocked.
- **Expected:** World flags list matches usage

## Acceptance criteria
- Bed search adds old-key
- Computer search sets computer_on
- Window inspect sets window_seen
- Door leave gated on old-key sets door_unlocked

## Definition of done
- Events authored
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-580.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-116
- Requirement: REQ-291
- Unit (Act): UNIT-580
- Unit (Verify): UNIT-584
- Status: completed
- Change: UPDATE
