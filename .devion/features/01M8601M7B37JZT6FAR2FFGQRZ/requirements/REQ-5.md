---
id: "01M8601M7BZ24SEGKJHTRG5V05"
kind: requirement
parent: 01M8601M7B37JZT6FAR2FFGQRZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Old placeholder styling is removed from styles.css

Context: styles.css L9-26 defines .contribution-sheet (white background, shadow) and ContributionSheet.tsx L115 uses it. Desired: dialog uses the frame kit Tailwind classes and the placeholder CSS is deleted.

## Acceptance criteria
- Given styles.css, when read, then .contribution-sheet is absent
- Given ContributionSheet, when rendered, then DialogContent has sf-frame-parchment and no contribution-sheet class


## Scope
- In scope: styles.css
- In scope: ContributionSheet className
- Out of scope: dialog logic
- Preserve: frame kit rules
- Preserve: html/body/#root overflow rule


## Technical constraints
- Shared palette tokens only


## Dependencies
- INT


## Definition of done
- Placeholder CSS gone


## Clarifying questions
- None
