# UNIT-096 — Act: Register admin execution routes from the same table

## Summary
Add adminExecutionRoutes(eh) and register it through a combined adminRoutes function.

## Description
Move execution registrations into the table and expose one adminRoutes(eh, rh) that tests can call.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `new: adminRoutes` · after adminRoundRoutes
- **Do:** Add func adminRoutes(eh *execution.Handler, rh *admin.RoundHandler) []adminRoute returning GET /executions (eh.List), POST /executions/{id}/retry (eh.Retry), POST /executions/{id}/approve (eh.Approve) followed by adminRoundRoutes(rh).

```
func adminRoutes(eh *execution.Handler, rh *admin.RoundHandler) []adminRoute {
	return append([]adminRoute{
		{http.MethodGet, "/executions", eh.List},
		{http.MethodPost, "/executions/{id}/retry", eh.Retry},
		{http.MethodPost, "/executions/{id}/approve", eh.Approve},
	}, adminRoundRoutes(rh)...)
}
```

- **Expected:** Eight routes returned.

### Step 2 — `backend/internal/server/server.go` · `New (admin route group)` · L101-L111
- **Do:** Replace the loop over adminRoundRoutes(rh) and the three inline ar.Get/ar.Post execution registrations with one loop over adminRoutes(eh, rh).

```
for _, rt := range adminRoutes(eh, rh) {
	ar.Method(rt.Method, rt.Pattern, rt.Handler)
}
```

- **Expected:** All eight routes still mounted behind admin.Middleware.

## Acceptance criteria
- adminRoutes returns eight routes: five round and three execution.
- Execution routes keep their paths and methods.

## Definition of done
- go build ./... passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-096.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-019
- Requirement: REQ-049
- Unit (Act): UNIT-096
- Unit (Verify): UNIT-098
- Status: completed
- Change: UPDATE
