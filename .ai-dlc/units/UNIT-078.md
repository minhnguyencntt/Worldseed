# UNIT-078 — Verify: Lifecycle, snapshot freeze and Git head unit tests

## Summary
Unit tests with fake committer, fixed clock and temp dir

## Description
Test Open/Close/Create, snapshot immutability, Head and ErrFrozen with fakes.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/lifecycle_test.go` · `new: TestOpen_SetsWindow, TestClose_FreezesSnapshot, TestClose_RequiresOpen, TestCreate_RejectsActiveRound` · new
- **Do:** Use fakeGit{head:"abc123"} recording Commit paths, a fixed Now, a stub Contributions returning two contributions. Assert Open yields EndsAt=StartsAt+24h and BaseRelease "1.0.0"; Close creates snapshot.yaml with 2 entries (mode 0o444), FreezeCommit=="abc123", Status CLOSED, committed paths include snapshot.yaml; Close on SCHEDULED round returns ErrIllegalTransition and no snapshot.yaml; second Close errors and snapshot bytes unchanged; Create with an OPEN round present returns ErrActiveRound
- **Run:** `cd backend && go test ./internal/round -run 'TestOpen|TestClose|TestCreate'`
- **Expected:** Lifecycle tests pass (go test reports PASS)

### Step 2 — `backend/internal/contribution/store_test.go` · `new: TestFileStore_SaveRejectsFrozenRound, TestFileStore_ListByRound` · after existing tests
- **Do:** With fakeCommitter and t.TempDir, create worlds/w/rounds/round-0000001/snapshot.yaml then Save a Contribution for that round; assert errors.Is ErrFrozen and no *.md created; separately save two contributions and assert ListByRound returns both oldest first
- **Run:** `cd backend && go test ./internal/contribution -run 'TestFileStore_SaveRejectsFrozenRound|TestFileStore_ListByRound'`
- **Expected:** Frozen and ListByRound tests pass (go test reports PASS)

### Step 3 — `backend/internal/gitrepo/gitrepo_test.go` · `new: TestHead_ReturnsTrimmedSHA` · after existing tests
- **Do:** Fake Runner returns "deadbeef\n"; assert Head returns "deadbeef" and args were rev-parse HEAD; a failing runner returns an error
- **Run:** `cd backend && go test ./internal/gitrepo -run TestHead`
- **Expected:** TestHead passes (go test reports PASS)

## Acceptance criteria
- Open sets 24h window and base release
- Close writes snapshot, records fake SHA, status CLOSED, and a second Close fails
- FileStore.Save into a frozen round returns ErrFrozen and creates no file
- CLI.Head returns trimmed SHA from a fake Runner

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-078.md`

## Links
- Evidence: EVD-015
- Requirement: REQ-037
- Unit (Act): UNIT-072
- Unit (Verify): UNIT-078
- Status: completed
- Change: UPDATE
