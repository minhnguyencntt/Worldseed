---
id: "01M84JM1FFGHQ19JMRG56HZ6QX"
kind: requirement
parent: 01M84JM1FF791K2NPAWKFKEP90
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Export source interface supplies a round's contributions and imports no removed code

Context: FileStore.ListByRound(ctx, worldID, roundID) already lists contributions. Desired behavior: a documented ExportSource interface with that method so exporters depend on an abstraction; FileStore satisfies it. Why: allows mocking and handoff independence from removed code.

## Acceptance criteria
- Given FileStore, when assigned to ExportSource, then it compiles
- Given a fake ExportSource, when ListByRound is called, then it returns its contributions
- Given export source files, when imports are parsed, then none contain worker or execution


## Scope
- In scope: ExportSource interface and compile-time assertion
- Out of scope: Exporter logic
- Preserve: FileStore.ListByRound signature


## Technical constraints
- Method signature must equal FileStore.ListByRound


## Definition of done
- Interface documented and asserted


## Clarifying questions
- None
