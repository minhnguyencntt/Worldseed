# UNIT-609 — Act: Add characterAnimationKey helper to characterAnimation

## Summary
Export a pure helper that builds the animation key BootScene plays

## Description
Add characterAnimationKey(ref) returning asset:animation, matching keys such as character:boy:idle, so tests can assert the NPC idle key.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/characterAnimation.ts` · `new: characterAnimationKey` · after L18
- **Do:** Append an exported function characterAnimationKey taking ref of type {asset:string; animation:string} and returning the string asset + ':' + animation.

```
export function characterAnimationKey(ref: { asset: string; animation: string }): string {
  return `${ref.asset}:${ref.animation}`;
}
```

- **Expected:** Importing characterAnimationKey yields the asset:animation string

## Acceptance criteria
- characterAnimationKey({asset:'character:npc',animation:'idle'}) returns 'character:npc:idle'
- resolveCharacterAnimation is unchanged

## Definition of done
- Helper exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-609.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-123
- Requirement: REQ-305
- Unit (Act): UNIT-609
- Unit (Verify): UNIT-612
- Status: approved
- Change: UPDATE
