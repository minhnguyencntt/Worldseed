---
id: "01M84JF0K072BJSFZDDNE272TG"
kind: requirement
parent: 01M84JF0K0XHTV40GE5BY6073A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · FileStore supplies frozen contribution IDs from snapshot.yaml

FileStore already implements ListByRound. Add FrozenIDs reading worlds/<world>/rounds/<round>/snapshot.yaml (the file round.writeSnapshot creates) and returning the contribution ids, reporting not-frozen when the file is absent.

## Acceptance criteria
- Given a temp root with snapshot.yaml listing ids, When FrozenIDs is called, Then those ids are returned with frozen=true
- Given no snapshot.yaml, When FrozenIDs is called, Then frozen=false and no error
- Given unsafe world or round ids, When FrozenIDs is called, Then an error is returned


## Scope
- In scope: FileStore.FrozenIDs in a new file
- Out of scope: Writing snapshots
- Preserve: round.Snapshot format


## Technical constraints
- No import of internal/round; use a local minimal yaml struct


## Definition of done
- FileStore satisfies ExportSource via compile-time assertion


## Clarifying questions
- None
