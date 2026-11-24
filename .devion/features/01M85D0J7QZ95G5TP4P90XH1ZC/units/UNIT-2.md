---
id: "01M85D0J7Q6T973JDN5236P3CK"
kind: unit
parent: 01M85D0J7QM3ANYQHFAB6ZPK28
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Clear the blank-text message on typing and valid submit

Clear the validation message when the player edits the text or submits a valid idea.

## Acceptance criteria
- Typing removes the alert
- Valid submit leaves no blank-text alert


## Scope
- In scope: ContributionSheet.tsx onChange and handleSubmit
- Out of scope: Tests
- Preserve: Trimmed prompt
- Preserve: setText('') after valid submit


## Technical constraints
- Depends on the validation state introduced by the first Act
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- ACT1


## Definition of done
- onChange clears validation
- Valid submit clears validation


## Clarifying questions
- None
