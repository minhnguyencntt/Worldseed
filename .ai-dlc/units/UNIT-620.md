# UNIT-620 — Act: Wrap ContributionSheet in a Radix Dialog and wire the App trigger

## Summary
Radix Dialog shell with focus restore

## Description
Convert ContributionSheet root into Dialog.Root/Portal/Overlay/Content with Title and Description, and make App's trigger the focus-restoring opener.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet` · L1-L2, L62-L64, L87-L117
- **Do:** Import * as Dialog from '@radix-ui/react-dialog'. Remove the `if (!open) return null` early return at L62-L64 (hooks stay above it). Replace the root div at L88 with Dialog.Root open={open} onOpenChange={(next) => { if (!next) onClose(); }}, containing Dialog.Portal > Dialog.Overlay className='contribution-overlay' and Dialog.Content className='contribution-sheet' with Dialog.Title (text 'Suggest What Happens Next', replacing the h2) and Dialog.Description (text 'Ideas are considered when the Round closes.', replacing the p). Keep the remaining paragraph, form, alert and list inside Content, and make the Close button wrap Dialog.Close asChild.

```
<Dialog.Root open={open} onOpenChange={(next) => { if (!next) onClose(); }}><Dialog.Portal><Dialog.Overlay className="contribution-overlay" /><Dialog.Content className="contribution-sheet">…</Dialog.Content></Dialog.Portal></Dialog.Root>
```

- **Expected:** Open sheet renders a role=dialog named 'Suggest What Happens Next'; closed sheet renders nothing

### Step 2 — `game/frontend/src/App.tsx` · `App playing view trigger button` · L66-L78
- **Do:** Keep the Suggest What Happens Next button and sheetOpen state; add no navigation. Radix restores focus to the element focused before opening, so no extra code beyond keeping the button rendered while the dialog is open.
- **Expected:** Trigger button remains in the DOM and receives focus after the dialog closes

### Step 3 — `game/frontend/src/styles.css` · `.contribution-sheet` · L9-L30
- **Do:** Add a .contribution-overlay rule (position: fixed; inset: 0; background: rgba(0,0,0,0.55)) and make .contribution-sheet position: fixed centered with max-width 28rem and max-height 90vh with overflow-y auto.
- **Expected:** Modal is centered over the game with a dimmed overlay and no page scroll

## Acceptance criteria
- Dialog.Content has role dialog and accessible name 'Suggest What Happens Next'
- Escape and overlay click call onClose
- Closing returns focus to the trigger button

## Definition of done
- Component renders through Radix Dialog
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-620.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-125
- Requirement: REQ-310
- Unit (Act): UNIT-620
- Unit (Verify): UNIT-623
- Status: approved
- Change: UPDATE
