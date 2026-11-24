---
id: "01M85C02SB299XD2W64BSF42EG"
kind: unit
parent: 01M85C02SBSNWX9ZZMWWX5VGPS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add validation, quota gating and submit states to ContributionSheet

Add MAX_PROMPT_LEN to the client and implement validation, disabled/loading submit and success feedback in handleSubmit.

## Acceptance criteria
- Empty and over-length text produce inline alerts without a fetch
- Quota exhausted disables the form
- Success shows 'Idea sent'


## Scope
- In scope: handleSubmit and form markup
- In scope: MAX_PROMPT_LEN export
- Out of scope: History states
- Preserve: errorMessage
- Preserve: submitContribution call


## Technical constraints
- Count length with Array.from(prompt).length to match rune count
- Code path: `game/frontend/src/api/client.ts`
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Validation paths implemented


## Clarifying questions
- None
