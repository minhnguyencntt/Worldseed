# UNIT-320 — Act: Add header slot to GameLayout

## Summary
GameLayout optional header prop

## Description
Add header?: ReactNode prop, rendered first inside main.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout` · L7-L16
- **Do:** Change signature to ({ scene, story, header }: { scene: ReactNode; story: ReactNode; header?: ReactNode }) and render {header} immediately before {scene} inside <main>.

```
<main ...>{header}{scene}</main>
```

- **Expected:** Header node is a child of main

## Acceptance criteria
- Given a header prop, when GameLayout renders, then the header node is a child of main rendered before the scene
- Given no header prop, when GameLayout renders, then main still renders the scene unchanged

## Definition of done
- tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-320.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-064
- Requirement: REQ-161
- Unit (Act): UNIT-320
- Unit (Verify): UNIT-323
- Status: completed
- Change: UPDATE
