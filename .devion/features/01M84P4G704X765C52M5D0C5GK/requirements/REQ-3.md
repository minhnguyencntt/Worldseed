---
id: "01M84P4G70Y5GXRTM4G897W73D"
kind: requirement
parent: 01M84P4G704X765C52M5D0C5GK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Old RoundBadge and Countdown usage is removed from App

Context: App.tsx renders RoundBadge and Countdown directly at the top of the scene. Desired behavior: delete those imports and JSX, since HeaderOverlay shows status and countdown. Expected result: only one countdown (inside the header) exists. Why: avoid duplicated round UI.

## Acceptance criteria
- Given a resolved round, when the playing view renders, then exactly one timer element exists (inside the header)
- Given the playing view, then no element from RoundBadge renders outside the header
- Given App.tsx source, then it does not import RoundBadge or Countdown


## Scope
- In scope: Removing imports and JSX from App.tsx
- Out of scope: Deleting component files
- Preserve: HeaderOverlay's own Countdown usage


## Dependencies
- REQ2


## Definition of done
- No RoundBadge/Countdown references in App.tsx


## Clarifying questions
- None
