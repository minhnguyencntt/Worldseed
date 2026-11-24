---
id: "01M85CF86VA0C04MPFM3XX3Y5J"
kind: unit
parent: 01M85CF86VWZFWD56BTXPAKRGR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Rebuild ContributionSheet on the Dialog parts

Replace the div role=dialog in ContributionSheet.tsx with Dialog, DialogContent, DialogTitle and DialogDescription.

## Acceptance criteria
- Escape and overlay dismissal call onClose via onOpenChange
- Title and description are Radix Title and Description


## Scope
- In scope: ContributionSheet.tsx
- Out of scope: Tests
- Preserve: Submit, history and quota logic


## Technical constraints
- Hooks stay above any conditional return
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- ACT1


## Definition of done
- Sheet renders through Dialog


## Clarifying questions
- None
