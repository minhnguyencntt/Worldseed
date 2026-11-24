# UNIT-848 — Verify: Inventory grid slots, icons and empty slots unit tests

## Summary
Unit tests for buildInventorySlots and the rendered grid.

## Description
Tests cover empty inventory, partial inventory and an unknown item.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/storyPanelData.test.ts` · `buildInventorySlots tests` · after portrait tests
- **Do:** Add tests: [] gives 6 slots all id null; ['old-key'] gives slot 0 name 'Old Key' and icon ending items/old-key.png (path read from manifest.json item/old-key entry) with 5 empty; ['mystery-thing'] gives name 'Mystery Thing' and icon undefined.
- **Run:** `cd game/frontend && npx vitest run tests/storyPanelData.test.ts`
- **Expected:** All tests pass.

### Step 2 — `game/frontend/tests/storyPanelInventory.test.tsx` · `new: StoryPanel inventory grid` · new
- **Do:** Render StoryPanel with inventory [] and assert 6 li in Inventory region, all data-empty='true', no img; with ['old-key'] assert first li contains text 'Old Key' and an img 16 wide, five li data-empty='true'; list element has class grid-cols-3.
- **Run:** `cd game/frontend && npx vitest run tests/storyPanelInventory.test.tsx`
- **Expected:** All inventory tests pass.

### Step 3 — `game/frontend/tests/story.test.tsx` · `inventory assertions` · search 'Empty' and inventory queries
- **Do:** Replace assertions of the text 'Empty' and raw item id with assertions on six slots and the humanised item name.
- **Run:** `cd game/frontend && npx vitest run tests/story.test.tsx tests/frameKit.test.tsx`
- **Expected:** Both files pass.

## Acceptance criteria
- Six slots for 0, 1 and 6 items
- Icon and name for old-key
- Unknown item has name and no icon

## Definition of done
- Tests pass; old Empty text assertions updated
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-848.md`

## Links
- Evidence: EVD-170
- Requirement: REQ-423
- Unit (Act): UNIT-845
- Unit (Verify): UNIT-848
- Status: completed
- Change: UPDATE
