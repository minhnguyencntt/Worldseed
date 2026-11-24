---
id: "01M84HZNH84BC2H25A900EWZXA"
kind: unit
parent: 01M84HZNH83HVDAEZNT04YH2EH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm kept route registrations in server.New are untouched

Read New and confirm the kept registrations remain; restore any that were altered during removal.

## Acceptance criteria
- All kept routes remain registered with the same handlers
- Admin round routes stay mounted behind admin.Middleware


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: handlers
- Preserve: all kept patterns


## Technical constraints
- No pattern changes
- Code path: `backend/internal/server/server.go`


## Definition of done
- Kept registrations unchanged


## Clarifying questions
- None
