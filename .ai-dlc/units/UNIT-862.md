# UNIT-862 — Act: Delete placeholder CSS and restyle the contribution dialog with the kit

## Summary
Remove .contribution-sheet rules

## Description
Switch DialogContent className and delete the two rule blocks.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet DialogContent` · L115
- **Do:** Replace className="contribution-sheet" with Tailwind plus kit classes keeping the bottom sheet position.

```
className="sf-frame-parchment fixed inset-x-0 bottom-0 z-10 max-h-[70vh] overflow-y-auto p-sf-4 text-sf-md"
```

- **Expected:** Dialog styled by the kit

### Step 2 — `game/frontend/src/styles.css` · `.contribution-sheet rules` · L9-L26
- **Do:** Delete the .contribution-sheet block and the .contribution-sheet textarea block.

```
remove lines 9-26
```

- **Expected:** No placeholder styling remains

## Acceptance criteria
- Given styles.css, then no .contribution-sheet
- Given the dialog, then it uses kit classes

## Definition of done
- Placeholder removed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-862.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-172
- Requirement: REQ-433
- Unit (Act): UNIT-862
- Unit (Verify): UNIT-867
- Status: completed
- Change: UPDATE
