---
id: "01M84JM1FFVPQJAV1NXA9WRW6R"
kind: requirement
parent: 01M84JM1FF791K2NPAWKFKEP90
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Stable documented JSON export type with round id, ids, authors, content and timestamps

Context: no export type exists. Desired behavior: exported Export and ExportContribution structs with explicit json tags and doc comments describing the format and its version. Expected result: marshalling yields a stable shape. Why: the devion handoff consumes it.

## Acceptance criteria
- Given an Export, when json.Marshal runs, then keys include version, world_id, round_id, contributions
- Given an ExportContribution, when marshalled, then keys are id, author, content, created_at with RFC3339 time
- Given the types, when read, then each has a doc comment


## Scope
- In scope: Export, ExportContribution structs, ExportVersion const
- Out of scope: Producing exports
- Preserve: Contribution struct unchanged


## Technical constraints
- Only stdlib and existing contribution package


## Definition of done
- Struct tags and docs present


## Clarifying questions
- None
