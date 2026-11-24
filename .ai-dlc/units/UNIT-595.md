# UNIT-595 — Act: Emit characterClick from the BootScene character pointerdown handler

## Summary
Emit characterClick with the spec id before the animation guards in createCharacter.

## Description
In createCharacter, the POINTER_DOWN listener first emits characterClick { id: spec.id } on phaserToReact, then runs the existing interact animation logic.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.createCharacter` · L117-L123
- **Do:** Inside the POINTER_DOWN callback, add phaserToReact.emit('characterClick', { id: spec.id }) as the first statement, before the 'if (!idleKey) return' guard.

```
sprite.on(Phaser.Input.Events.POINTER_DOWN, () => {
+  phaserToReact.emit('characterClick', { id: spec.id });
   if (!idleKey) return;
```

- **Expected:** Every character click emits characterClick; interact animation behavior is unchanged.

## Acceptance criteria
- Given a click on a character sprite, When the handler runs, Then characterClick { id: spec.id } is emitted.
- Given the interact animation exists, When clicked, Then it still plays and returns to idle.

## Definition of done
- Emit placed before the early-return guards
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-595.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-119
- Requirement: REQ-298
- Unit (Act): UNIT-595
- Unit (Verify): UNIT-597
- Status: completed
- Change: UPDATE
