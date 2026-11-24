# UNIT-604 — Act: Confirm BootScene creates, clicks and destroys character sprites

## Summary
Confirm BootScene create, createCharacter and shutdown handle characters.

## Description
Read BootScene.ts and confirm characters are created from scene.characters, characterClick is emitted before animation guards, and shutdown destroys sprites. Edit only if missing.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L66-L82
- **Do:** Check this.characterSprites is assigned from (scene.characters ?? []).map(createCharacter) and the SHUTDOWN callback runs characterSprites.forEach((s) => s.destroy()); restore if missing.

```
this.characterSprites.forEach((s) => s.destroy());
```

- **Run:** `cd game/frontend && grep -n "characterSprites" src/phaser/BootScene.ts`
- **Expected:** Assignment, destroy and reset lines are listed.

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.createCharacter` · L103-L124
- **Do:** Check the POINTER_DOWN handler calls phaserToReact.emit('characterClick', { id: spec.id }) before the idleKey and interactKey guards; reorder only if wrong.

```
phaserToReact.emit('characterClick', { id: spec.id });
```

- **Run:** `cd game/frontend && grep -n "characterClick" src/phaser/BootScene.ts`
- **Expected:** One emit line inside createCharacter.

## Acceptance criteria
- create maps scene.characters ?? [] to createCharacter
- The shutdown handler destroys each character sprite and clears the array
- POINTER_DOWN emits characterClick before the interact guards

## Definition of done
- All three behaviors present
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-604.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-122
- Requirement: REQ-303
- Unit (Act): UNIT-604
- Unit (Verify): UNIT-607
- Status: completed
- Change: UPDATE
