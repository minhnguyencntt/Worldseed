# UNIT-710 — Act: Add focusChange and menuClose to PhaserToReactEvents

## Summary
Declare two typed keyboard events

## Description
Add focusChange and menuClose to the PhaserToReactEvents interface in events.ts so BootScene and App can use them.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/events.ts` · `PhaserToReactEvents` · L3-L8
- **Do:** Add two members to the PhaserToReactEvents interface after sceneReady: focusChange with payload { id: string | null } and menuClose with payload Record<string, never>.

```
  sceneReady: { sceneId: string };
+ focusChange: { id: string | null };
+ menuClose: Record<string, never>;
```

- **Expected:** phaserToReact.emit('focusChange', { id: null }) and emit('menuClose', {}) type-check.

## Acceptance criteria
- PhaserToReactEvents has focusChange: { id: string | null }.
- PhaserToReactEvents has menuClose: Record<string, never>.

## Definition of done
- events.ts compiles with the two new members
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-710.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-143
- Requirement: REQ-355
- Unit (Act): UNIT-710
- Unit (Verify): UNIT-713
- Status: completed
- Change: UPDATE
