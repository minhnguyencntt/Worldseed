---
id: "01M85XAD0NPGK2S3J4X152MQ1P"
kind: unit
parent: 01M85XAD0NZN5VMA50KKS4VQF5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Fonts are npm packages imported locally with no URLs

Read package.json and sources from disk and assert fonts are local.

## Acceptance criteria
- Dependencies include both packages
- No font URL exists in src or index.html


## Scope
- In scope: tests/fonts.test.ts
- Out of scope: product code


## Technical constraints
- Unit test only; node fs reads


## Dependencies
- A2


## Definition of done
- fonts.test.ts passes


## Clarifying questions
- None
