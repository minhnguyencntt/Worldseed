# UNIT-474 — Verify: Hover, click, visibility and keyboard unit tests

## Summary
Prove interactive behavior with a fake render context and mocked Phaser.

## Description
Fake DisplayHandle captures registered callbacks so tests can fire pointer events.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/interaction.test.ts` · `new: getContextActions and nextFocus` · new
- **Do:** Assert getContextActions drops an action with conditions [{flag:'k'}] when flag unset and keeps it when set; assert nextFocus(['a','b','c'],'c',1)==='a', nextFocus(['a','b','c'],'a',-1)==='c', nextFocus([],null,1)===null.
- **Run:** `cd game && npx vitest run tests/interaction.test.ts`
- **Expected:** Test passes

### Step 2 — `game/tests/sceneObject.test.ts` · `new: SceneObject hover and click` · new
- **Do:** With a fake RenderContext whose handles store on() callbacks, build a SceneObject with one action and bounds; invoke the pointerover callback and assert setTint called, label visible, onHover('bed'); pointerout clears tint and calls onHover(null); pointerdown calls onClick('bed') once; assert setInteractive received the bounds and an action-less object never calls setInteractive.
- **Run:** `cd game && npx vitest run tests/sceneObject.test.ts`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/worldSceneEvents.test.ts` · `new: bus events` · new
- **Do:** Mock phaser; create WorldScene, subscribe to phaserToReact objectClick and objectHover, trigger the captured pointer callbacks and assert payloads {id}; trigger the captured ENTER key callback after focusNext and assert objectClick fired for the focused id.
- **Run:** `cd game/frontend && npx vitest run tests/worldSceneEvents.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- Hover, pointerout, pointerdown, bounds and action-less objects are asserted on SceneObject
- Context action filtering, focus wrapping and bus events for pointer and ENTER are asserted

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-474.md`

## Links
- Evidence: EVD-095
- Requirement: REQ-236
- Unit (Act): UNIT-470
- Unit (Verify): UNIT-474
- Status: approved
- Change: UPDATE
