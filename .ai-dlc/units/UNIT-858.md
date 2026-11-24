# UNIT-858 — Act: Switch GameLayout to a 3fr/1fr split

## Summary
Edit the root grid class in GameLayout

## Description
Change the md grid template in GameLayout so the scene gets three quarters of the width, keeping every other class.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout` · L19
- **Do:** Replace the root div class token md:grid-cols-[4fr_1fr] with md:grid-cols-[3fr_1fr], leaving grid, h-screen, w-full, grid-cols-1 and overflow-hidden unchanged.

```
md:grid-cols-[4fr_1fr] -> md:grid-cols-[3fr_1fr]
```

- **Expected:** Root grid renders a 3:1 split from md up

## Acceptance criteria
- Given GameLayout, when rendered, then the root has md:grid-cols-[3fr_1fr]
- Given narrow classes, when inspected, then max-md drawer classes are unchanged

## Definition of done
- Class swapped
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-858.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-172
- Requirement: REQ-429
- Unit (Act): UNIT-858
- Unit (Verify): UNIT-863
- Status: completed
- Change: UPDATE
