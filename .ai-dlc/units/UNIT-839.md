# UNIT-839 — Act: Add gold button variant, header suggest button and App wiring

## Summary
Add the gold variant, render it in the header, and remove the old App button.

## Description
Wire onSuggest and suggestRef through HeaderOverlay from App.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ui/button.tsx` · `ButtonVariant, variantClasses` · L6, L16-L20
- **Do:** Extend ButtonVariant to 'default' | 'ghost' | 'frame' | 'gold'. Add to variantClasses the entry gold: 'sf-btn sf-btn-gold inline-flex items-center gap-2 font-pixel text-sf-sm'. In Button, treat variant 'gold' like 'frame' when building frameProps (condition variant === 'frame' || variant === 'gold').

```
gold: 'sf-btn sf-btn-gold inline-flex items-center gap-2 font-pixel text-sf-sm'
```

- **Expected:** <Button variant="gold"> renders with class sf-btn-gold and data-state.

### Step 2 — `game/frontend/src/styles.css` · `new: .sf-btn-gold` · after L45
- **Do:** Append .sf-btn-gold { background: var(--sf-color-brass-5); color: var(--sf-color-wood-1); text-transform: uppercase; }
- **Expected:** Gold styling uses brass and wood tokens.

### Step 3 — `game/frontend/src/components/HeaderOverlay.tsx` · `HeaderOverlayProps, HeaderOverlay` · L7-L13, before the sound button
- **Do:** Import type Ref from react. Add props onSuggest?: () => void and suggestRef?: Ref<HTMLButtonElement>. Before the sound Button render <Button type="button" variant="gold" ref={suggestRef} aria-label="Suggest What Happens Next" onClick={onSuggest}>+ SUGGEST WHAT HAPPENS NEXT</Button>.
- **Expected:** Header shows the gold button and calls onSuggest on click.

### Step 4 — `game/frontend/src/App.tsx` · `App return, import Button` · L11, L68-L81
- **Do:** Pass onSuggest={() => setSheetOpen(true)} and suggestRef={triggerRef} to <HeaderOverlay>. Delete the <Button ...>Suggest What Happens Next</Button> element in the scene fragment and the now-unused Button import.
- **Expected:** Only the header holds the suggest button; ContributionSheet still receives returnFocusRef={triggerRef}.

## Acceptance criteria
- Header shows the gold suggest button with the accessible name Suggest What Happens Next.
- App has no other suggest button.

## Definition of done
- Button lives in header only
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-839.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-169
- Requirement: REQ-420
- Unit (Act): UNIT-839
- Unit (Verify): UNIT-842
- Status: completed
- Change: UPDATE
