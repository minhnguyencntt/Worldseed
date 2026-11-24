---
id: "01M8457KMMSQBY9VJAQTVZ1RNJ"
kind: requirement
parent: 01M8457KMMMN7NH1RGW812T7ZD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Contribution service validates prompt, world, round status, limits, rate and spam

Context: no contribution logic exists. Desired behavior: Service.Submit validates prompt length, world existence, OPEN round, per-player limit of 5, request rate and duplicate/spam prompts using an injected clock. Expected result: typed errors per rule. Why: protect the Git-backed record from abuse.

## Acceptance criteria
- Given a prompt shorter than MinPromptLen or longer than MaxPromptLen, when Submit runs, then ErrPromptLength is returned
- Given a world with no round source entry, when Submit runs, then ErrWorldNotFound is returned
- Given a round whose status is not OPEN, when Submit runs, then ErrRoundNotOpen is returned
- Given a player with 5 stored contributions in the round, when Submit runs, then ErrLimitReached is returned
- Given more than RateMax submissions in RateWindow by one player, when Submit runs, then ErrRateLimited is returned
- Given a prompt identical (case/whitespace-insensitive) to the player's earlier one or containing 10+ repeated identical characters, when Submit runs, then ErrDuplicate or ErrSpam is returned


## Scope
- In scope: The service rejects invalid submissions before anything is written.
- Out of scope: Admin APIs
- Out of scope: Frontend changes
- Out of scope: Git push
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI


## Definition of done
- Acceptance criteria met by implementation


## Clarifying questions
- None
