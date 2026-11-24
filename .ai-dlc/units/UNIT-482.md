# UNIT-482 — Act: Add interaction helper module

## Summary
Create game/src/systems/interaction.ts

## Description
Add pure functions pointInBounds, availableActions, isActivationKey and nextFocusIndex reusing evaluateAll.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/systems/interaction.ts` · `new: pointInBounds` · new
- **Do:** Create the file; export pointInBounds(spec: ObjectSpec, px: number, py: number): boolean returning false when spec.interactionBounds is undefined, else true when px and py lie within [position.x + b.x*scale, +b.width*scale] and [position.y + b.y*scale, +b.height*scale] inclusive of the left/top edge and exclusive of the right/bottom edge

```
const b = spec.interactionBounds; if (!b) return false; const x0 = spec.position.x + b.x * spec.scale; const y0 = spec.position.y + b.y * spec.scale; return px >= x0 && px < x0 + b.width * spec.scale && py >= y0 && py < y0 + b.height * spec.scale;
```

- **Expected:** Function compiles and returns booleans per the bounds rule

### Step 2 — `game/src/systems/interaction.ts` · `new: availableActions` · new
- **Do:** Export availableActions(state: GameState, spec: ObjectSpec): ActionSpec[] returning spec.actions.filter(a => evaluateAll(state, a.conditions)); import evaluateAll from './conditions'

```
return spec.actions.filter((a) => evaluateAll(state, a.conditions));
```

- **Expected:** Only actions with passing conditions are returned

### Step 3 — `game/src/systems/interaction.ts` · `new: isActivationKey` · new
- **Do:** Export isActivationKey(key: string): boolean returning true for 'Enter' and ' ' only

```
return key === 'Enter' || key === ' ';
```

- **Expected:** Returns true only for Enter and Space

### Step 4 — `game/src/systems/interaction.ts` · `new: nextFocusIndex` · new
- **Do:** Export nextFocusIndex(count: number, current: number, delta: 1 | -1): number returning -1 when count <= 0, else ((current + delta) % count + count) % count

```
if (count <= 0) return -1; return (((current + delta) % count) + count) % count;
```

- **Expected:** Focus index wraps in both directions

## Acceptance criteria
- Module exports the four functions with typed signatures
- availableActions uses evaluateAll on each action's conditions

## Definition of done
- interaction.ts compiles under tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-482.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-097
- Requirement: REQ-241
- Unit (Act): UNIT-482
- Unit (Verify): UNIT-485
- Status: completed
- Change: UPDATE
