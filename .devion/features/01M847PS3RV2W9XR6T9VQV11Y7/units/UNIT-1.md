---
id: "01M847PS3SD6X4B1PSE3TWMH1D"
kind: unit
parent: 01M847PS3RT4DY71541RXZRA22
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add API client and ContributionSheet wired into App

Implement api/client.ts with createSession, submitContribution, listMine, ApiError; the ContributionSheet component; and a Suggest What Happens Next button in App that toggles it.

## Acceptance criteria
- client.submitContribution POSTs JSON {world_id,prompt} with credentials include
- Sheet renders remaining count and Round-close note
- App shows the Suggest What Happens Next button after Begin


## Scope
- In scope: game/frontend/src/api/client.ts
- In scope: ContributionSheet.tsx
- In scope: App.tsx
- In scope: styles.css
- Out of scope: Tests
- Preserve: IntroScreen gate


## Technical constraints
- No new dependencies
- New file: `game/frontend/src/api/client.ts`
- New file: `game/frontend/src/components/ContributionSheet.tsx`
- Code path: `game/frontend/src/App.tsx`
- Code path: `game/frontend/src/styles.css`


## Dependencies
- REQ-1


## Definition of done
- Component compiles under tsc --noEmit


## Clarifying questions
- None
