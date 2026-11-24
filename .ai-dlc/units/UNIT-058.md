# UNIT-058 — Act: Implement the Markdown contribution store and path sanitizer

## Summary
Each contribution becomes a distinct Markdown file; traversal is rejected.

## Description
Context: the service needs a Store. Desired behavior: Store writes worlds/<world>/rounds/<round>/contributions/<id>.md with a generated ID under a mutex, refuses overwrite, commits via the Git interface, and rejects unsafe path segments. Expected result: concurrent submissions never collide. Why: immutability and safety.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/safepath/safepath.go` · `new: Segment` · new
- **Do:** Create package safepath with ErrUnsafe and Segment(s string) error that accepts only ^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$ and returns ErrUnsafe otherwise.
- **Expected:** Segment(".."), "a/b" and "" return ErrUnsafe; "ROUND-0000001" returns nil

### Step 2 — `backend/internal/contribution/model.go` · `new: Contribution, NewID, render, parse` · new
- **Do:** Define Contribution{ID, WorldID, RoundID, PlayerID, Prompt string; CreatedAt time.Time}; NewID returns "CON-"+32 hex chars from crypto/rand; render produces YAML front matter (id, world, round, player, created_at RFC3339) then a blank line and the prompt; parse reverses it.
- **Expected:** render then parse yields an equal Contribution

### Step 3 — `backend/internal/contribution/store.go` · `new: FileStore, Save, Get, ListByPlayer, CountByPlayer, HasPrompt` · new
- **Do:** Create FileStore{Root string; Git gitrepo.Committer; mu sync.Mutex} implementing Store. Save validates WorldID and RoundID with safepath.Segment, assigns NewID when ID is empty, locks mu, creates dir worlds/<world>/rounds/<lower-case round>/contributions, opens <id>.md with os.O_CREATE|os.O_EXCL|os.O_WRONLY (0o644), writes render output, then calls Git.Commit(ctx, []string{relPath}, "contribution <id>"). Get(id) validates id then walks worlds/*/rounds/*/contributions for <id>.md; ListByPlayer, CountByPlayer and HasPrompt read matching files.
- **Expected:** Files are created exclusively and committed through the interface

## Acceptance criteria
- Given two concurrent Save calls, when both complete, then two different files exist and each contains its own prompt
- Given an existing file for an ID, when Save would write it again, then the write fails and the file is unchanged
- Given a worldID or roundID containing .., a slash or a backslash, when Save runs, then safepath.ErrUnsafe is returned and nothing is written

## Definition of done
- Product code compiles with go build ./...
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-058.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-012
- Requirement: REQ-030
- Unit (Act): UNIT-058
- Unit (Verify): UNIT-063
- Status: completed
- Change: UPDATE
