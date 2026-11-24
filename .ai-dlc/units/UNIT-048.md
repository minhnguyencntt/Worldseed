# UNIT-048 — Act: Name the StoryPanel dialogue region

## Summary
Add aria-label Dialogue to the dialogue section

## Description
Give the dialogue section in StoryPanel the accessible name Dialogue so it can be queried as a region.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/StoryPanel.tsx` · `StoryPanel` · L13
- **Do:** Add aria-label="Dialogue" to the <section className="dialogue"> element rendered inside the {node && (...)} block.

```
<section className="dialogue"> -> <section className="dialogue" aria-label="Dialogue">
```

- **Expected:** A region named Dialogue renders only while a dialogue node is active.

## Acceptance criteria
- Given a node, when StoryPanel renders, then a region named Dialogue exists
- Given node undefined, when StoryPanel renders, then no Dialogue region exists

## Definition of done
- aria-label=Dialogue on the dialogue section
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-048.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-010
- Requirement: REQ-025
- Unit (Act): UNIT-048
- Unit (Verify): UNIT-051
- Status: completed
- Change: UPDATE
