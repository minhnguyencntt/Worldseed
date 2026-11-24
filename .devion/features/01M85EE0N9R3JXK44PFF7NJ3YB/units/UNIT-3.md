---
id: "01M85EE0N9FZPG3VSAV5WPGN2G"
kind: unit
parent: 01M85EE0N9VPTS685VVFDHSM4D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render inline success message after a successful send

Add a 'success' string state to ContributionSheet and render 'Suggestion sent' in a role=status paragraph beside the existing error paragraph.

## Acceptance criteria
- Success message appears after resolve and not after reject.
- Success message clears on typing and on the next submit.


## Scope
- In scope: success state and paragraph
- Out of scope: Error wording
- Preserve: Existing role=alert error paragraph at L135


## Technical constraints
- Success and error are mutually exclusive
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Success message visible only after a successful send


## Clarifying questions
- None
