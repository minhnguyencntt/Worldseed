# UNIT-875 — Act: Resize StoryPanel for the centered dialog

## Summary
StoryPanel uses dialog-sized readable classes and full-width gold choice buttons.

## Description
Change StoryPanel root and controls: drop the panel frame, h-full and text-sm; use font-pixel speaker headings and w-full gold choices.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/StoryPanel.tsx` · `StoryPanel root div` · L16
- **Do:** Change className from 'story-content sf-frame-panel h-full overflow-y-auto p-3 text-sm' to 'story-content flex flex-col gap-sf-3'.

```
story-content sf-frame-panel h-full overflow-y-auto p-3 text-sm -> story-content flex flex-col gap-sf-3
```

- **Expected:** Root no longer carries h-full or text-sm.

### Step 2 — `game/frontend/src/components/StoryPanel.tsx` · `speaker h2 and choice button` · L30-L42
- **Do:** Add className 'font-pixel' to the speaker <h2>{node.speaker}</h2>; change the choice button className from 'sf-btn' to 'sf-btn sf-btn-gold w-full text-left p-sf-2'.

```
<h2 className="font-pixel">{node.speaker}</h2> / className="sf-btn sf-btn-gold w-full text-left p-sf-2"
```

- **Expected:** Speaker uses pixel font and choices are full width.

## Acceptance criteria
- Root keeps story-content without h-full/text-sm
- Choice buttons are w-full

## Definition of done
- Classes applied
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-875.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-174
- Requirement: REQ-439
- Unit (Act): UNIT-875
- Unit (Verify): UNIT-879
- Status: approved
- Change: UPDATE
