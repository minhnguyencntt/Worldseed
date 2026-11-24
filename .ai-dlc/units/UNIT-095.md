# UNIT-095 — Act: Register admin round routes from an adminRoute table

## Summary
Introduce adminRoute and adminRoutes(rh) for round routes and register via loop.

## Description
Replace inline round registrations in server.New with a loop over a table so tests can reuse the same list.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `new: adminRoute, adminRoundRoutes` · after L116
- **Do:** Add type adminRoute struct{Method, Pattern string; Handler http.HandlerFunc} and func adminRoundRoutes(rh *admin.RoundHandler) []adminRoute returning the five round routes using rh.Create, rh.Open, rh.Close, rh.Get, rh.Contributions.

```
func adminRoundRoutes(rh *admin.RoundHandler) []adminRoute {
	return []adminRoute{
		{http.MethodPost, "/rounds", rh.Create},
		{http.MethodPost, "/rounds/{id}/open", rh.Open},
		{http.MethodPost, "/rounds/{id}/close", rh.Close},
		{http.MethodGet, "/rounds/{id}", rh.Get},
		{http.MethodGet, "/rounds/{id}/contributions", rh.Contributions},
	}
}
```

- **Expected:** Package compiles with the new table function.

### Step 2 — `backend/internal/server/server.go` · `New (admin route group)` · L101-L111
- **Do:** Remove the five inline ar.Post/ar.Get round registrations and add a loop over adminRoundRoutes(rh) calling ar.Method(route.Method, route.Pattern, route.Handler); keep the three execution registrations and ar.Use(admin.Middleware(...)).

```
for _, rt := range adminRoundRoutes(rh) {
	ar.Method(rt.Method, rt.Pattern, rt.Handler)
}
```

- **Expected:** Existing TestNew_AdminRoundsAreMounted still passes.

## Acceptance criteria
- Round routes are registered via the table with unchanged paths and methods.
- adminRoutes returns the five round routes.

## Definition of done
- go build ./... passes
- Behavior unchanged
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-095.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-019
- Requirement: REQ-048
- Unit (Act): UNIT-095
- Unit (Verify): UNIT-097
- Status: completed
- Change: UPDATE
