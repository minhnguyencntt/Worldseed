# UNIT-063 — Verify: Markdown contribution store and path sanitizer unit tests

## Summary
Unit tests proving each contribution becomes a distinct Markdown file and traversal is rejected.

## Description
Unit tests written from the requirement spec with mocked Git, clock and temp-dir filesystem only. Context: each contribution becomes a distinct Markdown file; traversal is rejected. Expected result: all listed tests pass.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/store_test.go` · `TestSave_ConcurrentDistinctFiles` · new
- **Do:** Write test TestSave_ConcurrentDistinctFiles: t.TempDir root, fake Committer recording calls; 50 goroutines call Save with different prompts; assert 50 distinct .md files under worlds/the-boys-room/rounds/round-0000001/contributions and 50 commits.
- **Run:** `cd backend && go test ./internal/contribution ./internal/safepath -run 'TestSave|TestGetAndList|TestSegment'`
- **Expected:** Test passes

### Step 2 — `backend/internal/contribution/store_test.go` · `TestSave_NoOverwrite` · new
- **Do:** Write test TestSave_NoOverwrite: Save with preset ID twice; second returns an error and file content equals the first prompt.
- **Run:** `cd backend && go test ./internal/contribution ./internal/safepath -run 'TestSave|TestGetAndList|TestSegment'`
- **Expected:** Test passes

### Step 3 — `backend/internal/contribution/store_test.go` · `TestSave_TraversalRejected` · new
- **Do:** Write test TestSave_TraversalRejected: WorldID "../x" and RoundID "a/b" return safepath.ErrUnsafe; temp dir stays empty.
- **Run:** `cd backend && go test ./internal/contribution ./internal/safepath -run 'TestSave|TestGetAndList|TestSegment'`
- **Expected:** Test passes

### Step 4 — `backend/internal/safepath/safepath_test.go` · `TestSegment` · new
- **Do:** Write table test TestSegment: "..", "a/b", "a\\b", "" and a 65-char string return ErrUnsafe; "ROUND-0000001" and "the-boys-room" return nil.
- **Run:** `cd backend && go test ./internal/safepath -run 'TestSegment'`
- **Expected:** Test passes

### Step 5 — `backend/internal/contribution/store_test.go` · `TestGetAndListByPlayer` · new
- **Do:** Write test TestGetAndListByPlayer: Save two contributions for different players; Get returns the exact fields; ListByPlayer returns one.
- **Run:** `cd backend && go test ./internal/contribution ./internal/safepath -run 'TestSave|TestGetAndList|TestSegment'`
- **Expected:** Test passes

## Acceptance criteria
- Given two concurrent Save calls, when both complete, then two different files exist and each contains its own prompt
- Given an existing file for an ID, when Save would write it again, then the write fails and the file is unchanged
- Given a worldID or roundID containing .., a slash or a backslash, when Save runs, then safepath.ErrUnsafe is returned and nothing is written
- Given a saved contribution, when Get(id) and ListByPlayer run, then the stored fields are returned

## Definition of done
- Listed tests pass via the unit command
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-063.md`

## Links
- Evidence: EVD-012
- Requirement: REQ-030
- Unit (Act): UNIT-058
- Unit (Verify): UNIT-063
- Status: completed
- Change: UPDATE
