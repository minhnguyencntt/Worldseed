---
id: "01M84JQE6BAEJ60ST7BZB6JWXR"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.2 Frozen-ids reader on the contribution file store

Context: backend/internal/contribution/store.go has FileStore (Save, Get, ListByRound) and export_source.go declares ExportSource with ListByRound and a compile-time assertion for *FileStore. A closed round's frozen contribution list lives in worlds/<world>/rounds/<round-lowercase>/snapshot.yaml (round.Snapshot, entries with id). Desired behavior: FileStore reads that file, returns the frozen contribution ids, returns ErrNotFound cleanly when no snapshot exists, and validates world and round ids. Why: the devion workseed handoff export needs only frozen contributions.

## Acceptance criteria
- Given a round dir with snapshot.yaml listing ids a and b, when FrozenIDs(ctx, world, round) is called, then it returns [a b] in snapshot order
- Given a round with no snapshot.yaml, when FrozenIDs is called, then it returns an error satisfying errors.Is(err, ErrNotFound)
- Given a world or round id that is not a safe path segment, when FrozenIDs is called, then it returns an error and reads no file
- Given the contribution package, when it compiles, then *FileStore is asserted to implement ExportSource including FrozenIDs


## Scope
- In scope: FileStore.FrozenIDs
- In scope: ExportSource interface method FrozenIDs
- Out of scope: Exporter assembling the JSON
- Out of scope: Any worker or execution code
- Out of scope: Changing snapshot writing in the round package
- Preserve: Existing Save, Get, ListByRound, ListByPlayer behavior
- Preserve: Export and ExportContribution JSON types
- Preserve: Snapshot file format in internal/round/snapshot.go


## Technical constraints
- Go backend; use gopkg.in/yaml.v3 already used by the round package
- Use safepath.Segment for id validation like ListByRound
- Round dir uses strings.ToLower(roundID)


## Definition of done
- FrozenIDs implemented and compiles
- ExportSource asserted on *FileStore
- Unit tests pass


## Clarifying questions
- None
