---
id: "01M84JVDP9Z0QEWRZG2QH3GBW7"
kind: requirement
parent: 01M84JVDP9RBW21G8QJ6WC1FBR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Exporter includes only frozen contributions in snapshot order

Exporter reads ListByRound and FrozenIDs from an ExportSource and builds Export with Version ExportVersion, WorldID, RoundID and ExportContribution entries (ID, Author=PlayerID, Content=Prompt, CreatedAt) for frozen ids only, in the order FrozenIDs lists them.

## Acceptance criteria
- Given contributions A,B,C and frozen ids [C,A], When Export runs, Then Contributions IDs are [C,A]
- Given an unfrozen contribution B, When Export runs, Then B does not appear and fields map PlayerID to author and Prompt to content


## Scope
- In scope: Exporter type and Export method
- Out of scope: empty round handling beyond non-nil slice
- Preserve: export.go types


## Technical constraints
- Frozen ids absent from ListByRound are skipped


## Definition of done
- Frozen-only filtering behaves as specified


## Clarifying questions
- None
