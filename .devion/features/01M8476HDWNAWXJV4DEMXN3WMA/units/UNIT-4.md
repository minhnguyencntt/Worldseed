---
id: "01M8476HDX26QTGG75HCFFFRZN"
kind: unit
parent: 01M8476HDXDHJR0X9BXE4PVW8F
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Admin execution routes reject missing and wrong tokens unit tests

Walk the real router and the route table to prove every admin route is protected and listed.

## Acceptance criteria
- All eight admin routes return 401 for missing and wrong tokens.
- retry and approve with 'Bearer tok' are not 401.
- Every /api/v1/admin route in the chi router is in adminRoutes.


## Scope
- In scope: backend/internal/server/server_test.go
- Out of scope: Live server
- Preserve: Existing tests


## Technical constraints
- httptest, chi.Walk, temp dir


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
