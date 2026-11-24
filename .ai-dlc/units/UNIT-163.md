# UNIT-163 — Act: Implement the Round poller and expired-Round closer

## Summary
Add rounds.Git, Round, Snapshot types, Detect and CloseExpired

## Description
Implement round file reading, detection and closing matching backend contracts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/internal/rounds/rounds.go` · `new: Git, Contribution, Round, Poller, Detect` · new
- **Do:** Define Git interface{Pull(ctx) error; Commit(ctx, paths []string, msg string) error; Head(ctx) (string, error); Contributions(ctx, world, round string) ([]Contribution, error)} and Contribution{ID, Player, Prompt string; CreatedAt time.Time}. Round mirrors backend round.Round yaml tags (id, world, number, status, starts_at, ends_at, base_release, freeze_commit omitempty, closed_at omitempty). Poller{Git Git; Root, World string; Now func() time.Time}. Detect(ctx) (scheduled, closed []Round, err error) calls Git.Pull then reads Root/worlds/<World>/rounds/*/round.yaml and splits statuses SCHEDULED and CLOSED, sorted by Number
- **Expected:** Detect returns Rounds by status

### Step 2 — `worker/internal/rounds/snapshot.go` · `new: Snapshot, SnapshotEntry, writeSnapshot, Poller.CloseExpired` · new
- **Do:** Copy Snapshot/SnapshotEntry structs with the exact backend yaml tags. writeSnapshot(dir, s) creates snapshot.yaml with O_CREATE|O_EXCL mode 0o444 and returns ErrSnapshotExists when present. CloseExpired(ctx) ([]string, error): after Pull, for each OPEN Round with !Now().Before(EndsAt): list Git.Contributions, build entries with sha256 hex of Prompt, writeSnapshot, Git.Commit the snapshot path, on commit error remove the snapshot, then Head(), set FreezeCommit, ClosedAt=&frozenAt, Status CLOSED, rewrite round.yaml atomically and Commit it; return closed IDs
- **Expected:** Expired Rounds become CLOSED with a read-only snapshot

## Acceptance criteria
- Detect classifies Rounds by status
- CloseExpired writes snapshot, commits, records head and updates round.yaml

## Definition of done
- go build ./... passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-163.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-035
- Requirement: REQ-083
- Unit (Act): UNIT-163
- Unit (Verify): UNIT-168
- Status: completed
- Change: UPDATE
