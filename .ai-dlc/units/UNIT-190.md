# UNIT-190 — Act: Implement the report writer package

## Summary
Create report.Writer

## Description
Create the report package with Report struct and Writer.Write that validates the id, then writes JSON atomically.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/report/report.go` · `new: Report` · new
- **Do:** Create package report with struct Report with json tags: ExecutionID execution_id string, RoundID round_id string, Status store.Status status, Attempts attempts int, Error error string, StartedAt started_at time.Time, FinishedAt finished_at time.Time, DurationMS duration_ms int64

```
type Report struct { ExecutionID string `json:"execution_id"`; ... }
```

- **Expected:** Type compiles

### Step 2 — `backend/worker/internal/report/report.go` · `new: Writer, New, Writer.Write` · new
- **Do:** Add Writer{dir string}, New(dir) *Writer, and Write(r Report) error: call store.ValidateID(r.ExecutionID) first and return its error; os.MkdirAll(dir,0o755); json.MarshalIndent; os.CreateTemp(dir, ".tmp-*"); write, close, os.Rename to filepath.Join(dir, id+".json"); remove temp on failure
- **Expected:** Valid report yields <dir>/<id>.json; invalid id returns before touching disk

## Acceptance criteria
- Write validates id via store.ValidateID
- Write produces <dir>/<id>.json atomically

## Definition of done
- Package compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-190.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-039
- Requirement: REQ-096
- Unit (Act): UNIT-190
- Unit (Verify): UNIT-193
- Status: completed
- Change: UPDATE
