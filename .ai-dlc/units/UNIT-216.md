# UNIT-216 — Act: Create the poller package with Git interface and Poll detection

## Summary
Add Round, Git, Clock, Result, Poller and Poll that detects SCHEDULED and CLOSED Rounds

## Description
Create backend/worker/internal/poller/poller.go. Follow the style of backend/worker/internal/recovery/recovery.go (small interfaces, New constructor, injected now).

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/poller/poller.go` · `new: package poller, Status, Round, Git, Closer, Clock, Result` · new
- **Do:** Create the file with package doc, Status string constants StatusScheduled, StatusOpen, StatusClosed, struct Round{ID, WorldID string; Status Status; EndsAt time.Time}, interface Git{Pull(ctx) error; ListRounds(ctx, worldID string) ([]Round, error)}, interface Closer{Close(ctx, worldID, roundID string) error}, interface Clock{Now() time.Time}, and struct Result{Scheduled, Closed, ClosedNow []string}.

```
type Git interface {
	Pull(ctx context.Context) error
	ListRounds(ctx context.Context, worldID string) ([]Round, error)
}
```

- **Expected:** Types compile and mirror backend/internal/round status names SCHEDULED, OPEN, CLOSED.

### Step 2 — `backend/worker/internal/poller/poller.go` · `new: Poller, New, Poller.Poll` · new
- **Do:** Add struct Poller{worldID string; git Git; closer Closer; clock Clock}, func New(worldID string, g Git, c Closer, clk Clock) *Poller, and Poll(ctx) (Result, error) that calls p.git.Pull, then p.git.ListRounds(ctx, p.worldID), then loops the Rounds appending r.ID to res.Scheduled when Status==StatusScheduled and to res.Closed when Status==StatusClosed.

```
switch r.Status {
case StatusScheduled:
	res.Scheduled = append(res.Scheduled, r.ID)
case StatusClosed:
	res.Closed = append(res.Closed, r.ID)
}
```

- **Expected:** Poll returns the detected IDs and a nil error for healthy fakes.

## Acceptance criteria
- Poll returns Scheduled and Closed IDs from the Git fake in list order.
- Package compiles with go build ./internal/poller.

## Definition of done
- poller.go builds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-216.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-043
- Requirement: REQ-108
- Unit (Act): UNIT-216
- Unit (Verify): UNIT-219
- Status: completed
- Change: UPDATE
