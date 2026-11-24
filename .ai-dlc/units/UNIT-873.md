# UNIT-873 — Act: Restyle IntroScreen as a centered dialog on a full-screen backdrop

## Summary
IntroScreen uses sf-fullscreen-bg, a parchment Frame dialog and a gold Button.

## Description
Rewrite the IntroScreen markup using the Frame and Button components, keeping the copy and onBegin.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/IntroScreen.tsx` · `IntroScreen` · L1-L17
- **Do:** Import Frame and Button; make the section class 'intro-screen sf-fullscreen-bg'; wrap the four paragraphs and a Button variant gold labelled Begin in <Frame kind='parchment' className='sf-dialog text-center'>.

```
<section className="intro-screen sf-fullscreen-bg"><Frame kind="parchment" className="sf-dialog text-center">...<Button variant="gold" onClick={onBegin}>Begin</Button></Frame></section>
```

- **Expected:** Intro shows a centered parchment dialog over the room backdrop.

## Acceptance criteria
- Root has class sf-fullscreen-bg
- Begin is a gold Button inside a parchment dialog

## Definition of done
- IntroScreen renders new structure
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-873.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-174
- Requirement: REQ-437
- Unit (Act): UNIT-873
- Unit (Verify): UNIT-877
- Status: approved
- Change: UPDATE
