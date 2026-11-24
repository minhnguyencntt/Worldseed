---
id: "01M845SASNM4N2RN0K2YCD3C8D"
kind: unit
parent: 01M845SASNGXM84XREXWYYCQXK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Player contributions route unit tests

Add subtests to backend/internal/server/server_test.go using httptest and a temp-dir repo, proving the new path serves Mine and the legacy path no longer does.

## Acceptance criteria
- Given a session cookie and round_id, when the new path is requested, then 200 and an empty JSON array body
- Given a session cookie, when the legacy path is requested, then 404
- Given no cookie, when the new path is requested, then 401


## Scope
- In scope: server_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Use t.TempDir() for Storage.RepoPath; no network


## Definition of done
- Test passes


## Clarifying questions
- None
