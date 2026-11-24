---
id: "01M85F81SHC4NVJ7MYD249HRYS"
kind: unit
parent: 01M85F81SGRD4T42R33VF5ST2K
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Guard every history effect update with the cancelled flag

Ensure both promise branches return early when cancelled is true.

## Acceptance criteria
- No writes after cleanup on resolve
- No writes after cleanup on reject


## Scope
- In scope: cancelled checks in effect
- Out of scope: API client
- Preserve: Existing .then merge logic


## Technical constraints
- Use the local cancelled flag
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- A1


## Definition of done
- Both branches guarded


## Clarifying questions
- None
