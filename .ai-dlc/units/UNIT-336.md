# UNIT-336 — Act: Add header slot prop to GameLayout

## Summary
Add optional header prop and render it inside main.

## Description
Edit GameLayout to accept header?: ReactNode and render it before scene inside the main element.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout` · L7-L14
- **Do:** Change the props signature to accept an optional header ReactNode and render {header} as the first child of the <main> element, before {scene}.

```
export function GameLayout({ header, scene, story }: { header?: ReactNode; scene: ReactNode; story: ReactNode }) {
 ...
 <main className="relative min-w-0 overflow-hidden pb-12 md:pb-0">{header}{scene}</main>
```

- **Expected:** GameLayout compiles and renders the header node inside main when given.

## Acceptance criteria
- Header node renders inside main when provided
- Layout unchanged when header is omitted

## Definition of done
- GameLayout accepts and renders header
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-336.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-067
- Requirement: REQ-168
- Unit (Act): UNIT-336
- Unit (Verify): UNIT-339
- Status: completed
- Change: NEW
