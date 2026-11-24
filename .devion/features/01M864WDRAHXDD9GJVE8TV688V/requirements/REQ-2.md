---
id: "01M864WDRB08JCTNZDV4W0XGZ0"
kind: requirement
parent: 01M864WDRAHXDD9GJVE8TV688V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Intro screen is a full-screen backdrop with a centered framed dialog

Context: IntroScreen.tsx renders four plain paragraphs and a bare button in section.intro-screen with no styling. Desired behavior: full-screen background and a centered framed dialog with a gold Begin button. Expected result: the first screen looks like an indie game title card. Why: first impression and usability.

## Acceptance criteria
- Given IntroScreen renders, when inspected, then the root has class sf-fullscreen-bg and contains a centered dialog with class sf-frame-parchment.
- Given IntroScreen renders, when the Begin button is clicked, then onBegin is called once and the four intro lines are still present.


## Scope
- In scope: IntroScreen markup and classes
- In scope: CSS for sf-fullscreen-bg and sf-dialog
- Out of scope: New artwork
- Out of scope: Changing intro copy
- Preserve: Intro text lines
- Preserve: Begin button accessible name 'Begin'
- Preserve: onBegin prop


## Technical constraints
- Use existing wall.png under /assets/worlds/the-boys-room/room as the backdrop
- Use Frame and Button components from components/ui


## Dependencies
- R1


## Definition of done
- IntroScreen shows a backdrop and centered dialog and its unit test passes


## Non-functional requirements
- image-rendering pixelated on the backdrop


## Clarifying questions
- None
