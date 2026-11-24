# UNIT-588 — Act: Emit characterClick from BootScene NPC sprites

## Summary
Add characterClick to the event bus types and emit it on NPC click.

## Description
Add the event type and emit it in createCharacter when the spec has an interaction.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/events.ts` · `PhaserToReactEvents` · L3-L7
- **Do:** Add a characterClick member after objectClick.

```
characterClick: { id: string; dialogue?: string };
```

- **Expected:** phaserToReact.emit('characterClick', ...) type-checks.

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.createCharacter pointerdown handler` · L117-L123
- **Do:** At the start of the POINTER_DOWN callback, before the `if (!idleKey) return;` guard, emit the event when spec.interaction exists.

```
if (spec.interaction) phaserToReact.emit('characterClick', { id: spec.id, dialogue: spec.interaction.dialogue });
```

- **Expected:** NPCs with interaction report clicks; others are unchanged.

## Acceptance criteria
- characterClick is typed in PhaserToReactEvents.
- Clicking an NPC with interaction emits it.

## Definition of done
- Event emitted on click
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-588.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-117
- Requirement: REQ-295
- Unit (Act): UNIT-588
- Unit (Verify): UNIT-591
- Status: approved
- Change: UPDATE
