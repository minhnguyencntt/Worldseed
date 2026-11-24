---
id: "01M84JF0K0XHTV40GE5BY6073A"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5 · Define frozen-contribution export for devion workseed handoff

Context: Worldseed hands player contributions of a closed Round to devion project workseed. backend/internal/contribution has FileStore.ListByRound and ErrFrozen, and backend/internal/round writes snapshot.yaml (round, world, frozen_at, contributions with ids) on Close. No export exists. Desired behavior: a documented export with stable JSON (round id, contribution ids, authors, content, timestamps) containing only frozen contributions, independent of removed code. Why: removal of development automation must not break the handoff.

## Acceptance criteria
- Given a round with a snapshot, When the export runs, Then JSON contains round id and for each frozen contribution id, author, content and created_at
- Given a round with no contributions, When exported, Then JSON has an empty contributions array, not null
- Given contributions on disk that are absent from the snapshot, When exported, Then they are excluded
- Given the export package, When compiled, Then it imports nothing from removed packages (worker, execution) and unit tests use mocked storage


## Scope
- In scope: backend/internal/contribution export code and its unit tests
- Out of scope: Calling devion
- Out of scope: Changing round package
- Out of scope: HTTP routes
- Preserve: Existing contribution Save/Get/List behavior
- Preserve: snapshot.yaml format


## Technical constraints
- Go module github.com/worldseed/storyforge/backend; contribution must not import internal/round (round depends on contribution)


## Definition of done
- Export documented, tested and go test ./internal/contribution passes


## Non-functional requirements
- Deterministic output order and field names


## Clarifying questions
- None
