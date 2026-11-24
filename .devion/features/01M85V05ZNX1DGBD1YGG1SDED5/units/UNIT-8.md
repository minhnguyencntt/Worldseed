---
id: "01M85V05ZPM1G65BCT0HJS7YNW"
kind: unit
parent: 01M85V05ZP2HJ5CMBBQXSWNDJM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Committed manifest boy entries match generated output unit tests

Import manifest.json and compare boy entries to the pure generator output; assert the old boy entry is unchanged.

## Acceptance criteria
- Boy sheet and portrait entries match generated entries
- character:boy still points to the svg


## Scope
- In scope: tests/boyManifestFile.test.ts


## Technical constraints
- Read manifest through a JSON import, no real fs and no app start


## Definition of done
- Test file passes


## Clarifying questions
- None
