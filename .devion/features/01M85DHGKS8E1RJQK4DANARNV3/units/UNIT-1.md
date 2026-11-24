---
id: "01M85DHGKSHSPVMC0AAMZ0655K"
kind: unit
parent: 01M85DHGKSJBH3MSY772BM1TN0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render the zero-quota inline message in ContributionSheet

Add a QUOTA_MESSAGE constant and render it as an alert paragraph when remaining <= 0, in game/frontend/src/components/ContributionSheet.tsx.

## Acceptance criteria
- The paragraph with text 'You have used all your suggestions this round' renders when remaining <= 0
- The paragraph is absent when remaining > 0


## Scope
- In scope: ContributionSheet.tsx message
- Out of scope: Tests
- Out of scope: Send disabling
- Preserve: Existing alerts and counter


## Technical constraints
- Reuse the existing `remaining` const
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Message renders only at zero quota


## Clarifying questions
- None
