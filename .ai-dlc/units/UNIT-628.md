# UNIT-628 — Act: Return focus to the trigger when the sheet closes

## Summary
Add returnFocusRef prop and trigger ref in App

## Description
ContributionSheet accepts optional returnFocusRef; DialogContent onCloseAutoFocus focuses it; App holds the ref on the trigger button.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheetProps, ContributionSheet` · L4-L8, DialogContent element
- **Do:** Add optional field returnFocusRef?: RefObject<HTMLElement | null> to ContributionSheetProps (import type RefObject from react), destructure it, and add onCloseAutoFocus on DialogContent that calls event.preventDefault() then returnFocusRef?.current?.focus() only when the ref has a current element.

```
onCloseAutoFocus={(event) => { if (returnFocusRef?.current) { event.preventDefault(); returnFocusRef.current.focus(); } }}
```

- **Expected:** With a ref given, focus goes to it on close; without, Radix default applies

### Step 2 — `game/frontend/src/App.tsx` · `App` · L1, L31, L70-L77
- **Do:** Import useRef, add const triggerRef = useRef<HTMLButtonElement>(null) after the sheetOpen state, set ref={triggerRef} on the Suggest What Happens Next button, and pass returnFocusRef={triggerRef} to ContributionSheet.

```
<button type="button" ref={triggerRef} onClick={() => setSheetOpen(true)}>
```

- **Expected:** Trigger receives focus after the sheet closes

## Acceptance criteria
- Given a returnFocusRef with a current element, when the sheet closes, then that element receives focus
- Given no returnFocusRef is passed, when the sheet closes, then the Radix default focus restoration applies

## Definition of done
- Trigger focused after close
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-628.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-126
- Requirement: REQ-315
- Unit (Act): UNIT-628
- Unit (Verify): UNIT-631
- Status: completed
- Change: UPDATE
