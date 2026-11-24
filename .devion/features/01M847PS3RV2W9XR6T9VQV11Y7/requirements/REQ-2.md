---
id: "01M847PS3RD5CQZ60PWGMVF3TR"
kind: requirement
parent: 01M847PS3RV2W9XR6T9VQV11Y7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Countdown and Round status badge show the current Round

Context: the API serves {id,number,status,starts_at,ends_at}. Desired behavior: a Countdown component ticking each second to ends_at showing HH:MM:SS, 'Round closed' at zero, and a RoundBadge showing status text; App fetches the Round on mount. Why: players know when ideas close.

## Acceptance criteria
- Given ends_at 90 seconds ahead, then the countdown shows 00:01:30 and after 1 second 00:01:29
- Given ends_at in the past, then it shows 'Round closed'
- Given status OPEN, then the badge shows OPEN
- Given the Round fetch fails, then the badge shows 'Round unavailable'


## Scope
- In scope: getCurrentRound, Countdown, RoundBadge, App fetch
- Out of scope: Admin views
- Preserve: Game layout


## Technical constraints
- Clock injectable via now prop for tests


## Dependencies
- REQ-1


## Definition of done
- Badge and countdown visible in playing view


## Clarifying questions
- None
