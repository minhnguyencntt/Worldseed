# UNIT-852 — Act: Add keyboard focus flow, ARIA labels and live region to ObjectOverlay

## Summary
Add aria labels, the live region and DOM focus movement to the overlay.

## Description
ObjectOverlay renders a role=group region with aria-label, per-button aria-label, an aria-live polite region from focusedObjectId, and moves focus to the first action on Enter for a focused object.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ObjectOverlay.tsx` · `ObjectOverlay` · new section
- **Do:** Add role='group' and aria-label={object.name} on the action container; aria-label={`${action.label} ${object.name}`} on each button; always render a visually-hidden div role='status' aria-live='polite' whose text is `${name}. Actions: ${labels.join(', ')}` for the active object and '' otherwise; add onKeyDown on the container: Escape calls phaserToReact.emit('menuClose',{}).

```
<div role="status" aria-live="polite" className="sr-only">{announcement}</div>
```

- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** type-checks

### Step 2 — `game/frontend/src/App.tsx` · `App objectClick handler` · L44
- **Do:** On objectClick also keep selectedId; pass a focusFirstAction flag to ObjectOverlay when selectedId equals activeId so its first button receives DOM focus through a ref in a useEffect.
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** type-checks

## Acceptance criteria
- Live region text derives from store focus and content
- Buttons carry combined aria-labels
- Escape emits menuClose

## Definition of done
- Live region present while focus is set
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-852.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-171
- Requirement: REQ-427
- Unit (Act): UNIT-852
- Unit (Verify): UNIT-856
- Status: completed
- Change: UPDATE
