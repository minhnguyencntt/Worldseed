---
id: "01M85DRYK9C407PX7NJEFBBM22"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.2.3 Block submit and disable Send at zero quota

Context: ContributionSheet computes remaining = MAX_PER_PLAYER - sent entries but never uses it to gate submit. Desired behavior: at remaining 0 the sheet shows 'You have used all your suggestions this round', Send is disabled and handleSubmit returns early without calling submitContribution. Expected result: a player with no quota cannot submit. Why: avoids a wasted backend call and tells the player why.

## Acceptance criteria
- Given remaining quota is 0, when the sheet is open, then the text 'You have used all your suggestions this round' is shown inline
- Given remaining quota is above 0, when the sheet is open, then that message is absent
- Given remaining quota is 0, when the sheet renders, then the Send button is disabled and a submit event does not call submitContribution


## Scope
- In scope: ContributionSheet zero-quota message
- In scope: Send disabled state
- In scope: early return in handleSubmit
- Out of scope: Backend quota enforcement
- Out of scope: Changing MAX_PER_PLAYER
- Out of scope: Blank and over-limit validation behavior
- Preserve: Contributions left counter
- Preserve: Blank and max-length validation
- Preserve: Existing Dialog focus behavior


## Technical constraints
- Reuse the existing remaining value in game/frontend/src/components/ContributionSheet.tsx
- Use the real client module and mock it in tests; no mock data in product code


## Definition of done
- Both requirements are delivered with their Act and Verify units
- Unit tests pass


## Non-functional requirements
- Message is exposed with role alert for accessibility


## Clarifying questions
- None
