---
id: "01M84VMJ3AMC40DGR820PNA2PG"
kind: unit
parent: 01M84VMJ3A52YFCQ2ACYAXZW9B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: parseGitLsFiles and checkTrackedFiles dedupe conflict entries

Add tests proving the parser dedupes conflict stage entries and checkTrackedFiles reports each path once.

## Acceptance criteria
- Mocked listing with stages 1-3 yields one path.
- checkTrackedFiles reports results.json once.


## Scope
- In scope: tests/trackedNodeModules.test.ts
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Fake GitRunner, no real git


## Definition of done
- New tests pass


## Clarifying questions
- None
