# UNIT-172 — Act: Add the JSON slog logger factory

## Summary
Add logging.New returning a JSON slog logger by level

## Description
Implement the logger factory used by the worker.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/logging/logging.go` · `new: New` · new
- **Do:** Add func New(w io.Writer, level string) (*slog.Logger, error): map 'debug','info','warn','error' (case-insensitive via strings.ToLower) to slog.Level, else return fmt.Errorf("logging: unknown level %q", level); return slog.New(slog.NewJSONHandler(w, &slog.HandlerOptions{Level: lvl})).

```
func New(w io.Writer, level string) (*slog.Logger, error)
```

- **Expected:** Package compiles; JSON handler honors the level

## Acceptance criteria
- New returns a JSON logger for debug, info, warn, error
- Unknown level returns an error

## Definition of done
- package builds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-172.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-036
- Requirement: REQ-087
- Unit (Act): UNIT-172
- Unit (Verify): UNIT-176
- Status: completed
- Change: UPDATE
