---
id: "01M85E1KCJA30Z1A1BAX9ZJ7DS"
kind: unit
parent: 01M85E1KCJ8QXX5NXE6AYKZA9N
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm zero-quota gating in ContributionSheet

Context: remaining = MAX_PER_PLAYER minus sent entries. Expected result: three gating points present.

## Acceptance criteria
- handleSubmit returns when remaining <= 0 before reading text
- Send has disabled={remaining <= 0} and the alert id contribution-idea-quota renders when remaining <= 0


## Scope
- In scope: Quota guard, Send button, quota message
- Out of scope: Tests
- Preserve: Existing texts


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- REQ-QUOTA


## Definition of done
- Gating confirmed present, added only if missing


## Clarifying questions
- None
