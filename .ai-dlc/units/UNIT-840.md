# UNIT-840 — Act: Render loading, error, empty states in the pill and group icon controls

## Summary
Move state branches into the pill with data-state and group the icons.

## Description
Change the ternary in HeaderOverlay so each state is inside the sf-pill and the icon buttons sit in a group. Done after ACT1 in the same file.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/HeaderOverlay.tsx` · `HeaderOverlay state branches` · L24-L40 (as changed by ACT1)
- **Do:** Make error branch: <span data-testid="round-pill" data-state="error" className="sf-pill"><span role="alert">Round unavailable: {error}</span></span> followed by the existing Retry Button when onRetry is set. Loading: <span data-testid="round-pill" data-state="loading" className="sf-pill">Loading round…</span>. Empty: <span data-testid="round-pill" data-state="empty" className="sf-pill">No active round</span>. Ready pill gets data-state="ready".
- **Expected:** Every state is rendered in a pill with data-state.

### Step 2 — `game/frontend/src/components/HeaderOverlay.tsx` · `icon buttons` · sound and settings Buttons
- **Do:** Wrap the sound and settings Buttons in <div role="group" aria-label="Header controls" className="ml-auto flex items-center gap-2"> and keep their aria-label, aria-pressed and onClick unchanged.
- **Expected:** Both icons are in the labelled group and still toggle uiStore.

## Acceptance criteria
- Each state has a pill with data-state.
- Icon buttons are inside a role group labelled Header controls.

## Definition of done
- Markup done
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-840.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-169
- Requirement: REQ-421
- Unit (Act): UNIT-840
- Unit (Verify): UNIT-843
- Status: completed
- Change: UPDATE
