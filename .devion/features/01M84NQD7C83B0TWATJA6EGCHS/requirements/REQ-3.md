---
id: "01M84NQD7D7TG8EXHE6B67FE8K"
kind: requirement
parent: 01M84NQD7C83B0TWATJA6EGCHS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · HeaderOverlay has loading, empty and error states explaining round API failure

Context: RoundBadge currently shows 'Round unavailable' with no reason. Desired behavior: loading=true shows 'Loading round…'; error set shows 'Round unavailable: <error>' in role=alert; no round, no error and not loading shows 'No active round'. Logo, world name and controls stay visible in all states. Expected result: failure is explained. Why: users must understand why no round is shown.

## Acceptance criteria
- Given loading true, When rendered, Then 'Loading round…' is shown and no timer is present
- Given error 'Round service returned 500', When rendered, Then a role=alert contains that text
- Given loading false, error undefined, round undefined, When rendered, Then 'No active round' is shown


## Scope
- In scope: Three non-ready states and their precedence: error over loading over empty
- Out of scope: Fetching the round
- Out of scope: Retry button
- Preserve: Logo and controls visible in all states


## Technical constraints
- error prop is string | undefined


## Definition of done
- All three states render distinct text


## Non-functional requirements
- Error uses role=alert


## Clarifying questions
- None
