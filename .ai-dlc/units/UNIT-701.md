# UNIT-701 — Act: Subscribe App to the objectClick event from Phaser

## Summary
Add a phaserToReact objectClick subscription that sets selectedId.

## Description
Edit game/frontend/src/App.tsx to subscribe to phaserToReact objectClick and select that object, unsubscribing on unmount.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `imports` · L10-L12
- **Do:** Add an import of phaserToReact from './phaser/events' next to the existing runtime imports.

```
import { phaserToReact } from './phaser/events';
```

- **Expected:** phaserToReact is available in App.tsx.

### Step 2 — `game/frontend/src/App.tsx` · `App (objectClick effect)` · after L43
- **Do:** Insert a useEffect after the loadRound effect that calls phaserToReact.on('objectClick', ({ id }) => setSelectedId(id)) and returns the unsubscribe function, with an empty dependency array.

```
useEffect(() => phaserToReact.on('objectClick', ({ id }) => setSelectedId(id)), []);
```

- **Expected:** Emitting objectClick sets selectedId so ActionMenu opens; unmount removes the listener.

## Acceptance criteria
- Given objectClick is emitted with an id, when App is mounted, then selectedId becomes that id.
- Given App unmounts, when cleanup runs, then the subscription is removed.

## Definition of done
- useEffect returns the unsubscribe function from phaserToReact.on
- App.tsx compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-701.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-141
- Requirement: REQ-351
- Unit (Act): UNIT-701
- Unit (Verify): UNIT-703
- Status: completed
- Change: UPDATE
