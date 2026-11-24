# UNIT-234 — Act: Remove execution wiring and routes from server.New

## Summary
Drop the execution import, store, handler and routes from server.go.

## Description
Edit backend/internal/server/server.go so it no longer references the execution package and mounts only round admin routes.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `import block` · L17
- **Do:** Remove the import line of github.com/worldseed/storyforge/backend/internal/execution.

```
- "github.com/worldseed/storyforge/backend/internal/execution"
```

- **Expected:** No execution import remains.

### Step 2 — `backend/internal/server/server.go` · `New` · L85-L90
- **Do:** Delete the exStore := &execution.FileStore{...} literal and the eh := &execution.Handler{Service: exStore} line.
- **Expected:** New has no exStore or eh variables.

### Step 3 — `backend/internal/server/server.go` · `New` · L106-L110
- **Do:** Change the loop to range adminRoundRoutes(rh) instead of adminRoutes(eh, rh).

```
for _, rt := range adminRoutes(eh, rh) -> for _, rt := range adminRoundRoutes(rh)
```

- **Expected:** Admin group mounts only the five round routes.

### Step 4 — `backend/internal/server/server.go` · `adminRoutes` · L129-L139
- **Do:** Delete the whole adminRoutes function and its doc comment, which only existed to prepend the /executions routes.
- **Expected:** adminRoutes no longer exists; go build ./... succeeds.

## Acceptance criteria
- Given server.go, when read, then it has no execution import, exStore, eh or /executions routes.
- Given New, when mounting admin routes, then it iterates adminRoundRoutes(rh).

## Definition of done
- server.go compiles without internal/execution
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-234.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-046
- Requirement: REQ-118
- Unit (Act): UNIT-234
- Unit (Verify): UNIT-237
- Status: completed
- Change: UPDATE
