---
id: "01M85D83WG40K167CXYEWS90PD"
kind: unit
parent: 01M85D83WGT15FRTDHB1R6R31G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add MAX_PROMPT_LENGTH and the n / max counter

Add MAX_PROMPT_LENGTH = 500 to the API client and render a counter derived from the trimmed text length in ContributionSheet.

## Acceptance criteria
- Counter reads 'n / 500' for the trimmed text length
- Textarea aria-describedby includes the counter id


## Scope
- In scope: client.ts constant
- In scope: ContributionSheet counter
- Out of scope: Tests
- Out of scope: Over-limit logic
- Preserve: Existing blank validation


## Technical constraints
- Count with Array.from(text.trim()).length
- Code path: `game/frontend/src/api/client.ts`
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- REQ1


## Definition of done
- Constant exported and counter rendered


## Clarifying questions
- None
