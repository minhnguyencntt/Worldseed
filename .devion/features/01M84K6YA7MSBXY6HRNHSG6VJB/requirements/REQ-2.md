---
id: "01M84K6YA8KP40D4H47ZQ3N0SG"
kind: requirement
parent: 01M84K6YA7MSBXY6HRNHSG6VJB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Documentation describes the handoff to devion workseed

Context: backend/README.md contains only 'hello Worldseed' and no docs describe the handoff. The Export type in backend/internal/contribution/export.go defines JSON v1 with version, world_id, round_id and contributions[id, author, content, created_at], and the Exporter includes only frozen contributions in snapshot order. Desired behavior: the docs say Worldseed collects contributions and hands frozen ones to devion workseed, which develops the game, and they document the format. Why: contributors and operators need to know where development happens.

## Acceptance criteria
- Given backend/README.md, when it is read, then it says Worldseed holds the game, contribution intake and round lifecycle, and that development is done by devion workseed
- Given backend/docs/handoff.md, when it is read, then it documents the keys version, world_id, round_id, contributions, id, author, content and created_at and states that only frozen contributions are exported
- Given the docs, when they are read, then they contain no mention of worker, ExecutionPanel, Claude Code or Cursor


## Scope
- In scope: backend/README.md
- In scope: backend/docs/handoff.md
- Out of scope: Code changes
- Out of scope: Root README
- Preserve: Export format v1


## Technical constraints
- The documented format must match export.go exactly
- The docs must not claim a CLI or API for export that does not exist


## Definition of done
- Both docs are written and match the export type


## Clarifying questions
- None
