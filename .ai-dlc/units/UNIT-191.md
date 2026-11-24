# UNIT-191 — Act: Write a report from Runner.Run for every outcome

## Summary
Wire Reporter into Runner

## Description
Add Reporter interface and SetReporter, wrap Run so a report is written after any run that acquired the lock.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `new: Reporter, Runner.reporter, Runner.SetReporter` · after L36, L49-L57
- **Do:** Add interface Reporter{ Write(report.Report) error }, field reporter Reporter on Runner, and method SetReporter(rep Reporter) assigning it; import internal/report

```
type Reporter interface { Write(report.Report) error }
```

- **Expected:** Runner can hold a reporter; nil means no reports

### Step 2 — `backend/worker/internal/runner/runner.go` · `Runner.Run, new: Runner.run` · L77-L165
- **Do:** Rename the existing Run body to run(ctx,id,roundID). Add new Run that records start:=r.now(), calls run, and if the returned execution has ID "" (lock failure) returns unchanged; otherwise if r.reporter!=nil builds report.Report from e (ExecutionID,RoundID,Status,Attempts,Error from e.Error or err.Error() when empty, StartedAt start, FinishedAt r.now(), DurationMS) and calls Write; if Write errors and err==nil return e and the wrapped error 'runner: write report: %w'
- **Expected:** A report is written on every branch after the lock is taken

## Acceptance criteria
- Report written on FAILED, AWAITING_APPROVAL and COMPLETED
- No report when lock.ErrLocked

## Definition of done
- Compiles and existing tests unaffected
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-191.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-039
- Requirement: REQ-097
- Unit (Act): UNIT-191
- Unit (Verify): UNIT-194
- Status: completed
- Change: UPDATE
