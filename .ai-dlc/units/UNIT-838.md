# UNIT-838 — Act: Restructure HeaderOverlay into logo, plaque and status pill with dot

## Summary
Rebuild the header markup and add the pill, dot and brass-corner styles.

## Description
Edit HeaderOverlay.tsx to use Frame for the plaque, add the round-pill with dot, and add CSS classes in styles.css.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/HeaderOverlay.tsx` · `HeaderOverlay` · L18-L47
- **Do:** Import Frame from './ui/Frame'. On the <header> add data-testid="header-bar" and class sf-brass-corners. Wrap the logo in <span className="sf-logo font-pixel">StoryForge</span>. Wrap the world title in <Frame kind="plaque" as="span" className="px-3 py-1">{worldTitle}</Frame>. In the round branch replace the three bare spans with <span data-testid="round-pill" className="sf-pill"><span data-testid="round-dot" data-status={round.status} className="sf-dot" aria-hidden="true" /><span>{round.id}</span><span data-status={round.status}>{round.status}</span></span> followed by <Countdown endsAt={round.ends_at} />.

```
<span data-testid="round-pill" className="sf-pill">...</span>
```

- **Expected:** A loaded round renders the pill with dot, id and status, plus the timer.

### Step 2 — `game/frontend/src/styles.css` · `new: .sf-logo, .sf-pill, .sf-dot, .sf-brass-corners` · after L45
- **Do:** Append classes: .sf-logo {color: var(--sf-color-brass-5); text-transform: uppercase; letter-spacing: 1px;} .sf-pill {display:inline-flex; align-items:center; gap: var(--sf-space-2); padding: 2px var(--sf-space-3); background: var(--sf-color-ink-2); color: var(--sf-color-parchment-5);} .sf-dot {width:8px; height:8px; background: var(--sf-color-lamp-4);} .sf-dot[data-status='OPEN'] {background: var(--sf-color-brass-5);} .sf-brass-corners {position: relative;} .sf-brass-corners::before, .sf-brass-corners::after {content:''; position:absolute; top:0; width:8px; height:8px; background: var(--sf-color-brass-4);} .sf-brass-corners::before {left:0;} .sf-brass-corners::after {right:0;}
- **Expected:** Classes exist and use only palette token variables.

## Acceptance criteria
- The header renders the logo, plaque, pill with dot and Countdown for a loaded round.
- The text StoryForge, round id and status remain as separate text nodes.

## Definition of done
- Header renders new structure with test ids header-bar, round-pill, round-dot
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-838.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-169
- Requirement: REQ-419
- Unit (Act): UNIT-838
- Unit (Verify): UNIT-841
- Status: completed
- Change: UPDATE
