# UNIT-845 — Act: Add buildInventorySlots and render the 3x2 inventory grid

## Summary
Create slot builder and render it in StoryPanel.

## Description
Pure helper maps inventory ids to six slot descriptors; StoryPanel renders them in a grid.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/storyPanelData.ts` · `new: buildInventorySlots` · after portraitPath
- **Do:** Export type InventorySlot = { id: string | null; name: string; icon: string | undefined }, const INVENTORY_SLOT_COUNT = 6, and buildInventorySlots(inventory: string[]): InventorySlot[]. For index 0..5: if inventory[i] exists, name = id split on '-' with each word capitalised and joined by space, icon = '/assets/'+path of manifest asset id `item/${id}` or undefined; else { id: null, name: '', icon: undefined }.

```
Array.from({ length: INVENTORY_SLOT_COUNT }, (_, i) => ...)
```

- **Expected:** buildInventorySlots(['old-key'])[0] is {id:'old-key',name:'Old Key',icon:'/assets/worlds/the-boys-room/items/old-key.png'}; length is 6.

### Step 2 — `game/frontend/src/components/StoryPanel.tsx` · `StoryPanel Inventory section` · L35-L47
- **Do:** Replace the Empty/ul branch with <ul className='grid grid-cols-3 gap-2'> mapping buildInventorySlots(inventory) to <li className='sf-frame-slot' data-slot={i} data-empty={slot.id === null}> containing, for filled slots, <img width={16} height={16} alt='' style pixelated> when icon exists and <span>{slot.name}</span>. Keep the section aria-label='Inventory' and h2.
- **Expected:** Six li render; filled ones show name and icon; empty ones have data-empty='true'.

## Acceptance criteria
- buildInventorySlots returns length 6
- Names are humanised ids
- Grid uses grid-cols-3

## Definition of done
- Grid always renders six slots
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-845.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-170
- Requirement: REQ-423
- Unit (Act): UNIT-845
- Unit (Verify): UNIT-848
- Status: completed
- Change: UPDATE
