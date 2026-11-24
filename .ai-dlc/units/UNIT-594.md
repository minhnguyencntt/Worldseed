# UNIT-594 — Act: Add characterClick to PhaserToReactEvents

## Summary
Add the characterClick event type to events.ts.

## Description
Add characterClick: { id: string } to the PhaserToReactEvents interface so the typed bus accepts it.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/events.ts` · `PhaserToReactEvents` · L3-L7
- **Do:** Add a new member characterClick typed { id: string } to the PhaserToReactEvents interface directly after objectClick.

```
objectClick: { id: string };
+  characterClick: { id: string };
```

- **Expected:** tsc accepts phaserToReact.emit('characterClick', { id: 'boy' }) and rejects other payload shapes.

## Acceptance criteria
- Given events.ts, When compiled, Then PhaserToReactEvents has characterClick with { id: string }.
- Given the existing events, When compiled, Then objectHover, objectClick and sceneReady are unchanged.

## Definition of done
- characterClick added to PhaserToReactEvents
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-594.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-119
- Requirement: REQ-297
- Unit (Act): UNIT-594
- Unit (Verify): UNIT-596
- Status: completed
- Change: UPDATE
