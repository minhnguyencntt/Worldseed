---
id: "01M85G4W6A4MQ87YJDYBQ387GD"
kind: unit
parent: 01M85G4W6A2QMKXHZ6BTZWSBYF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add test ids to the history loading and empty messages

Edit ContributionSheet.tsx so the loading and empty history paragraphs have data-testid attributes while keeping role and text.

## Acceptance criteria
- Loading paragraph has data-testid contribution-history-loading
- Empty paragraph has data-testid contribution-history-empty


## Scope
- In scope: ContributionSheet.tsx L154, L159
- Out of scope: Tests
- Preserve: Roles and texts


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Attributes added; component compiles


## Clarifying questions
- None
