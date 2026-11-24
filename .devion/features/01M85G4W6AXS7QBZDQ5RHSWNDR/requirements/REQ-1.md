---
id: "01M85G4W6A2QMKXHZ6BTZWSBYF"
kind: requirement
parent: 01M85G4W6AXS7QBZDQ5RHSWNDR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Loading and empty history messages carry their own test ids

The loading message (L154) and the empty history message (L159) are plain role="status" paragraphs. Give each a data-testid so they cannot be confused with the success feedback or each other. Why: stable selectors.

## Acceptance criteria
- Given historyStatus is loading, when rendered, then an element with data-testid contribution-history-loading shows 'Loading your suggestions…'
- Given history loaded with no entries, when rendered, then an element with data-testid contribution-history-empty shows the empty message


## Scope
- In scope: data-testid on loading and empty paragraphs
- Out of scope: Changing message text
- Preserve: role="status" on both


## Technical constraints
- Edit only ContributionSheet.tsx


## Definition of done
- Both test ids present in rendered output


## Clarifying questions
- None
