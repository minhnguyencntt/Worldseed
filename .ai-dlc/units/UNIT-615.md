# UNIT-615 — Act: Add onRetry and Retry button to HeaderOverlay error state

## Summary
Add onRetry prop and Retry button in the error branch

## Description
Extend HeaderOverlayProps with onRetry and render the button in the error branch. Product code only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/HeaderOverlay.tsx` · `HeaderOverlayProps / HeaderOverlay` · L6-L24
- **Do:** Add `onRetry?: () => void` to the props and destructure it. Replace the error span with a fragment holding the alert span and, when onRetry is defined, a Retry Button.

```
<><span role="alert">Round unavailable: {error}</span>{onRetry && <Button type="button" variant="ghost" onClick={onRetry}>Retry</Button>}</>
```

- **Expected:** Error state renders a Retry button

## Acceptance criteria
- Retry button is rendered only when error is set and onRetry is provided
- Clicking calls onRetry

## Definition of done
- Component compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-615.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-124
- Requirement: REQ-308
- Unit (Act): UNIT-615
- Unit (Verify): UNIT-618
- Status: completed
- Change: UPDATE
