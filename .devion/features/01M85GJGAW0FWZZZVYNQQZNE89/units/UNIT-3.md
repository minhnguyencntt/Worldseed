---
id: "01M85GJGAXNGZVW9T77JRFP1MN"
kind: unit
parent: 01M85GJGAXW92AW56C3Q807DH1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add test ids to the blank and over-limit validation alerts

Add data-testid contribution-validation-blank and contribution-validation-limit to the validation paragraphs.

## Acceptance criteria
- Blank alert has contribution-validation-blank
- Limit alert has contribution-validation-limit


## Scope
- In scope: ContributionSheet.tsx validation alerts
- Out of scope: Tests
- Preserve: Ids used by aria-describedby


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Attributes present


## Clarifying questions
- None
