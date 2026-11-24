---
id: "01M84JQE6B6NQ81DJ5HS3B1MHS"
kind: requirement
parent: 01M84JQE6BAEJ60ST7BZB6JWXR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · FileStore.FrozenIDs reads snapshot.yaml and validates ids

FileStore gains FrozenIDs(ctx, worldID, roundID) ([]string, error) reading worlds/<world>/rounds/<lower round>/snapshot.yaml and returning each contribution entry id in file order. A missing file maps to ErrNotFound; unsafe ids are rejected before any filesystem access.

## Acceptance criteria
- Given snapshot.yaml with contributions ids a and b, when FrozenIDs is called, then it returns [a b]
- Given no snapshot.yaml, when FrozenIDs is called, then errors.Is(err, ErrNotFound) is true
- Given worldID '../x' or roundID 'a/b', when FrozenIDs is called, then an error is returned


## Scope
- In scope: store.go FrozenIDs
- Out of scope: Exporter
- Preserve: ListByRound behavior


## Technical constraints
- Decode with a local struct holding contributions[].id to avoid importing round


## Definition of done
- Method implemented per acceptance criteria


## Clarifying questions
- None
