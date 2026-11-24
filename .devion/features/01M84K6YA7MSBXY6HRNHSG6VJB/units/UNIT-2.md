---
id: "01M84K6YA8PBA885N0N86JC5Q0"
kind: unit
parent: 01M84K6YA8KP40D4H47ZQ3N0SG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Write the backend README and handoff doc for devion workseed

Rewrite backend/README.md, which currently holds the single line 'hello Worldseed', and create backend/docs/handoff.md describing the Export v1 format, taken from backend/internal/contribution/export.go and exporter.go.

## Acceptance criteria
- Given the README, when it is read, then it names the kept parts and links to docs/handoff.md
- Given the handoff doc, when it is read, then it matches the Export JSON keys


## Scope
- In scope: backend/README.md
- In scope: backend/docs/handoff.md
- Out of scope: Go code
- Preserve: Existing facts in the docs


## Technical constraints
- Plain Markdown only
- Code path: `backend/README.md`
- New file: `backend/docs/handoff.md`


## Definition of done
- Both files exist with the required content


## Clarifying questions
- None
