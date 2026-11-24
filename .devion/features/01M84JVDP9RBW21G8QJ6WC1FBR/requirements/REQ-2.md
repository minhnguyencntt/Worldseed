---
id: "01M84JVDP93P4F2VFZNBMCWSVY"
kind: requirement
parent: 01M84JVDP9RBW21G8QJ6WC1FBR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Empty round yields an empty list and source errors propagate

When the snapshot freezes no ids, or the round has no contributions, Export returns Contributions as an empty non-nil slice so JSON shows []. Errors from FrozenIDs (including ErrNotFound) and ListByRound are returned wrapped with %w.

## Acceptance criteria
- Given empty frozen ids, When Export runs, Then json.Marshal output contains "contributions":[]
- Given FrozenIDs returns ErrNotFound, When Export runs, Then errors.Is(err, ErrNotFound) is true


## Scope
- In scope: empty-round and error paths of Export
- Out of scope: creating snapshots
- Preserve: Export JSON types


## Technical constraints
- Use fmt.Errorf with %w


## Definition of done
- Empty and error paths behave as specified


## Clarifying questions
- None
