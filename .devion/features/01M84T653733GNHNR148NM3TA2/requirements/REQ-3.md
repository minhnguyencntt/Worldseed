---
id: "01M84T6537WP8JWV5WZ8JTZAH4"
kind: requirement
parent: 01M84T653733GNHNR148NM3TA2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A guard fails while any dependency path is tracked

Context: need a regression guard. Desired behavior: guard reads the tracked listing through the injected runner and throws an Error naming the offending paths when any exist. Why: fails the suite if node_modules is ever tracked again.

## Acceptance criteria
- Given a mocked listing with a node_modules path, when the guard runs, then it throws naming that path
- Given a clean mocked listing, when the guard runs, then it resolves without error


## Scope
- In scope: assertNoTrackedNodeModules
- Out of scope: Real git calls in tests
- Preserve: Existing tests


## Technical constraints
- Uses the same injected runner as the cleanup


## Dependencies
- r1


## Definition of done
- Guard exported and unit tested


## Clarifying questions
- None
