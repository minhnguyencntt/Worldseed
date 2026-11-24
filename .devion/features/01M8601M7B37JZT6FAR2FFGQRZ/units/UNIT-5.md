---
id: "01M8601M7C5MV3K32MBXN0CXN7"
kind: unit
parent: 01M8601M7BZ24SEGKJHTRG5V05
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Delete placeholder CSS and restyle the contribution dialog with the kit

Switch DialogContent className and delete the two rule blocks.

## Acceptance criteria
- Given styles.css, then no .contribution-sheet
- Given the dialog, then it uses kit classes


## Scope
- In scope: styles.css
- In scope: ContributionSheet.tsx
- Out of scope: logic
- Preserve: dialog behaviour


## Technical constraints
- Palette tokens only
- Code path: `game/frontend/src/styles.css`
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- REQ-STYLES


## Definition of done
- Placeholder removed


## Clarifying questions
- None
