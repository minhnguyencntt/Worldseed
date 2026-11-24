---
id: "01M8601M7CF48BJJ369XQ8SXNC"
kind: unit
parent: 01M8601M7BZ24SEGKJHTRG5V05
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: placeholder styling removed unit tests

Read styles.css from disk and render the dialog.

## Acceptance criteria
- Given styles.css, then it does not contain contribution-sheet
- Given the open dialog, then its content has class sf-frame-parchment


## Scope
- In scope: tests/noPlaceholderStyles.test.tsx
- In scope: tests/layout.test.tsx
- Out of scope: browser
- Preserve: frame kit selectors assertions


## Technical constraints
- Mock api client as contribution tests do via tests/fixtures/api.ts


## Dependencies
- ACT-STYLES


## Definition of done
- Tests pass


## Clarifying questions
- None
