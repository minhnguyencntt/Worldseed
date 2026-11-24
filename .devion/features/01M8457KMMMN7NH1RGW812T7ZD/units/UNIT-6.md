---
id: "01M8457KMNBK68FF8ZVEPJ0JDV"
kind: unit
parent: 01M8457KMMSQBY9VJAQTVZ1RNJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Contribution service validation unit tests

Unit tests written from the requirement spec with mocked Git, clock and temp-dir filesystem only. Context: the service rejects invalid submissions before anything is written. Expected result: all listed tests pass.

## Acceptance criteria
- Given a prompt shorter than MinPromptLen or longer than MaxPromptLen, when Submit runs, then ErrPromptLength is returned
- Given a world with no round source entry, when Submit runs, then ErrWorldNotFound is returned
- Given a round whose status is not OPEN, when Submit runs, then ErrRoundNotOpen is returned
- Given a player with 5 stored contributions in the round, when Submit runs, then ErrLimitReached is returned
- Given more than RateMax submissions in RateWindow by one player, when Submit runs, then ErrRateLimited is returned
- Given a prompt identical (case/whitespace-insensitive) to the player's earlier one or containing 10+ repeated identical characters, when Submit runs, then ErrDuplicate or ErrSpam is returned


## Scope
- In scope: Unit tests with fakes
- Out of scope: Running the server
- Out of scope: Browser or e2e checks
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI


## Definition of done
- Listed tests pass via the unit command


## Clarifying questions
- None
