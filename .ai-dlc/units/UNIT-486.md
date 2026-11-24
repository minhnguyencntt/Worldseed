# UNIT-486 — Verify: SceneObject hover, label and click unit tests

## Summary
Unit tests with a fake RenderContext

## Description
Extend tests/sceneObject.test.ts: update makeFakeContext so the fake handle includes the new methods and captures the hover and click callbacks.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sceneObject.test.ts` · `makeFakeContext` · L24-L28
- **Do:** Add vi.fn() for setHighlighted and setLabelVisible, and onHover/onClick mocks that store the passed callbacks in returned fields hoverCb and clickCb
- **Run:** `cd game && npx vitest run tests/sceneObject.test.ts`
- **Expected:** Existing tests still pass with the extended handle

### Step 2 — `game/tests/sceneObject.test.ts` · `new: it('passes label and bounds to createSprite')` · after L61
- **Do:** Make spec with interactionBounds {x:0,y:0,width:40,height:80}; construct; assert createSprite call object contains label equal to spec.name and bounds equal to that rectangle
- **Run:** `cd game && npx vitest run tests/sceneObject.test.ts -t 'label and bounds'`
- **Expected:** Assertion passes

### Step 3 — `game/tests/sceneObject.test.ts` · `new: it('toggles highlight and label on hover')` · after L61
- **Do:** Sync with a state where visibleWhen passes (setFlag a true), call hoverCb(true) then hoverCb(false); assert setHighlighted and setLabelVisible calls equal [[true],[false]]; with the flag unset, hoverCb(true) causes no true call
- **Run:** `cd game && npx vitest run tests/sceneObject.test.ts -t 'hover'`
- **Expected:** Hover toggles only when visible

### Step 4 — `game/tests/sceneObject.test.ts` · `new: it('emits interact on click only when visible')` · after L61
- **Do:** Register onInteract mock; with visible state call clickCb and assert one call with {objectId: spec.id, actions: spec.actions filtered by conditions}; with hidden state assert zero calls
- **Run:** `cd game && npx vitest run tests/sceneObject.test.ts -t 'emits interact'`
- **Expected:** Listener called once for visible, never for hidden

## Acceptance criteria
- Label and bounds passed to createSprite
- Hover toggles highlight and label
- Click emits only when visible

## Definition of done
- sceneObject.test.ts passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-486.md`

## Links
- Evidence: EVD-097
- Requirement: REQ-242
- Unit (Act): UNIT-483
- Unit (Verify): UNIT-486
- Status: completed
- Change: UPDATE
