# UNIT-837 — Verify: Frame classes, four-state Button and framed screen components render

## Summary
Unit tests for frameKit, Frame, Button states and wiring

## Description
Test generated CSS objects and rendered classes with stores mocked as needed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/frameKit.test.tsx` · `it('frame classes use border-image and pixelated')` · new
- **Do:** Call frameComponentClasses(); for each of bar, panel, plaque, parchment, slot assert key '.sf-frame-<name>' has imageRendering 'pixelated' and borderImage containing the FRAME_KIT file name and its slice. Assert keys '.sf-btn', '.sf-btn:disabled', ".sf-btn[data-state='hover']" and ".sf-btn[data-state='pressed']" exist with different borderImage values.
- **Run:** `npx vitest run tests/frameKit.test.tsx`
- **Expected:** Class object assertions pass

### Step 2 — `game/frontend/tests/frameKit.test.tsx` · `it('button shows four states')` · after first test
- **Do:** Render <Button variant='frame' state=S> for S in normal, hover, pressed, disabled with testing-library; assert each has class 'sf-btn' and data-state S, and the disabled one has the disabled attribute. Render <Frame kind='panel'> and assert class sf-frame-panel.
- **Run:** `npx vitest run tests/frameKit.test.tsx`
- **Expected:** Four-state and Frame tests pass

### Step 3 — `game/frontend/tests/frameKit.test.tsx` · `it('game screen components apply the kit')` · after second test
- **Do:** Render GameLayout with header, scene, story nodes; assert aside has class sf-frame-panel. Render HeaderOverlay with worldTitle 'W' and no round after resetting useUiStore via setState; assert the header has sf-frame-bar and the Settings button has sf-btn. Render StoryPanel with an inventory of one item and assert the item li has sf-frame-slot and the Dialogue region has sf-frame-parchment (use props shape from src/components/StoryPanel.tsx).
- **Run:** `npx vitest run tests/frameKit.test.tsx`
- **Expected:** Wiring assertions pass

## Acceptance criteria
- Frame classes include borderImage and pixelated
- Button renders four states
- Header, layout, story panel carry frame classes

## Definition of done
- frameKit.test.tsx passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-837.md`

## Links
- Evidence: EVD-168
- Requirement: REQ-418
- Unit (Act): UNIT-833
- Unit (Verify): UNIT-837
- Status: completed
- Change: UPDATE
