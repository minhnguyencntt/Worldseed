# UNIT-072 — Act: Implement lifecycle Create/Open/Close, snapshot and Git head

## Summary
Add Service, snapshot writer, gitrepo.Head and store frozen guard

## Description
Add round.Service with Create, Open, Close, Get; snapshot.go writing snapshot.yaml; gitrepo.Head via rev-parse; contribution FileStore.ListByRound and ErrFrozen guard.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/gitrepo/gitrepo.go` · `CLI.Head` · after L77
- **Do:** Add interface Revisioner{Head(ctx context.Context)(string,error)} and method (c *CLI) Head that runs `rev-parse HEAD` through c.Run (defaulting to defaultRunner) in c.Dir and returns strings.TrimSpace of output, wrapping errors with commandError("rev-parse",...)

```
var _ Revisioner = (*CLI)(nil)
```

- **Expected:** Head returns the 40-char SHA

### Step 2 — `backend/internal/contribution/store.go` · `FileStore.ListByRound, ErrFrozen, FileStore.Save` · L16-L21, L50-L80
- **Do:** Add ErrFrozen var; add ListByRound(ctx, worldID, roundID) globbing worlds/<world>/rounds/<round>/contributions/*.md via readFile sorted by CreatedAt then ID; in Save, after taking s.mu.Lock and before os.OpenFile, stat filepath.Join(s.Root,"worlds",c.WorldID,"rounds",strings.ToLower(c.RoundID),"snapshot.yaml") and return ErrFrozen when it exists
- **Expected:** Save into a frozen round returns ErrFrozen

### Step 3 — `backend/internal/round/snapshot.go` · `new: Snapshot, writeSnapshot` · new
- **Do:** Define Snapshot{Round,World string; FrozenAt time.Time; Contributions []SnapshotEntry{ID,Player string; CreatedAt time.Time; PromptSHA256 string}} with yaml tags; writeSnapshot(dir,s) marshals and creates snapshot.yaml with os.OpenFile O_CREATE|O_EXCL|O_WRONLY mode 0o444, returning ErrSnapshotExists if present
- **Expected:** Second write to same dir fails

### Step 4 — `backend/internal/round/lifecycle.go` · `new: Service, Create, Open, Close, Get, ErrActiveRound` · new
- **Do:** Implement Service guarded by sync.Mutex. Create(ctx,worldID,startsAt,duration,baseRelease) builds the next Round in SCHEDULED, rejects when any round is not COMPLETED/FAILED/CANCELLED, saves, commits round.yaml. Open(ctx,worldID,roundID,opts) calls Transition(StatusOpen), sets StartsAt=Now(), EndsAt=StartsAt+duration (opts.Duration or DefaultDuration), BaseRelease (opts or default), saves and commits. Close(ctx,worldID,roundID) checks CanTransition(OPEN,CLOSED) first, lists contributions, writeSnapshot, commits snapshot.yaml, calls Git.Head, sets FreezeCommit, ClosedAt, Transition(CLOSED), saves and commits round.yaml
- **Expected:** Rounds open and close with frozen snapshot

## Acceptance criteria
- Create assigns Number max+1 and ID ROUND-%07d and rejects when a non-terminal round exists with ErrActiveRound
- Close order: write snapshot, commit, Head, set freeze_commit and CLOSED, save, commit round.yaml
- Save in FileStore returns ErrFrozen when snapshot.yaml exists

## Definition of done
- go build ./... succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-072.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-015
- Requirement: REQ-037
- Unit (Act): UNIT-072
- Unit (Verify): UNIT-078
- Status: completed
- Change: UPDATE
