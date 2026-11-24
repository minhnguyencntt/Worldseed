---
id: "01M847PS3S6XS1XBYRQYV681MG"
kind: unit
parent: 01M847PS3RD5CQZ60PWGMVF3TR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add Countdown, RoundBadge and Round fetch in App

Add getCurrentRound to the client, Countdown and RoundBadge components, and wire them into App using the fetched Round.

## Acceptance criteria
- Countdown formats HH:MM:SS from an injectable clock
- Badge renders status text
- App passes round.id to ContributionSheet


## Scope
- In scope: client.ts
- In scope: Countdown.tsx
- In scope: RoundBadge.tsx
- In scope: App.tsx
- Out of scope: Tests
- Preserve: Existing App tests keep passing with fetch failing gracefully


## Technical constraints
- No new dependencies
- New file: `game/frontend/src/api/client.ts`
- New file: `game/frontend/src/components/Countdown.tsx`
- New file: `game/frontend/src/components/RoundBadge.tsx`
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- REQ-2


## Definition of done
- tsc passes


## Clarifying questions
- None
