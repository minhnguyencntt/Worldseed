# UNIT-049 — Act: Name the StoryPanel inventory region

## Summary
Add aria-label Inventory to the inventory section

## Description
Give the inventory section in StoryPanel the accessible name Inventory so restored inventory is queryable as a region.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/StoryPanel.tsx` · `StoryPanel` · L35-L36
- **Do:** Change the bare <section> that contains the <h2>Inventory</h2> heading to <section aria-label="Inventory">.

```
<section> -> <section aria-label="Inventory">
```

- **Expected:** A region named Inventory renders in the story panel.

## Acceptance criteria
- Given StoryPanel renders, then a region named Inventory exists
- Given an empty inventory, then the Empty text is still shown inside it

## Definition of done
- aria-label=Inventory on the inventory section
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-049.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-010
- Requirement: REQ-026
- Unit (Act): UNIT-049
- Unit (Verify): UNIT-052
- Status: completed
- Change: UPDATE
