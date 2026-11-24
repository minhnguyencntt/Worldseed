# UNIT-330 — Act: Add header slot prop to GameLayout

## Summary
Add optional header prop rendered in main.

## Description
Edit GameLayout to accept and render an optional header ReactNode inside main before the scene.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout` · L7-L19
- **Do:** Change the signature to accept an optional header: ReactNode prop and render {header} as the first child of the <main> element, before {scene}.

```
export function GameLayout({ header, scene, story }: { header?: ReactNode; scene: ReactNode; story: ReactNode }) {
 ...
 <main className="relative min-w-0 overflow-hidden pb-12 md:pb-0">{header}{scene}</main>
```

- **Expected:** GameLayout compiles and renders header inside main when given.

## Acceptance criteria
- GameLayout renders the header node inside main when provided.
- GameLayout without header renders unchanged.

## Definition of done
- header prop typed and rendered
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-330.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-066
- Requirement: REQ-165
- Unit (Act): UNIT-330
- Unit (Verify): UNIT-333
- Status: completed
- Change: UPDATE
