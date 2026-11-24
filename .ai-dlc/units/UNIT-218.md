# UNIT-218 — Act: Wrap Git failures and guard a nil Closer in Poll

## Summary
Make Pull and ListRounds errors abort Poll with wrapped messages and avoid a nil Closer panic

## Description
Finalize error semantics in Poller.Poll in poller.go.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/poller/poller.go` · `Poller.Poll (Pull and ListRounds calls)` · start of Poll body
- **Do:** Wrap the Pull error as fmt.Errorf("poller: pull: %w", err) and the ListRounds error as fmt.Errorf("poller: list rounds: %w", err); both return Result{} immediately so no later call runs.

```
if err := p.git.Pull(ctx); err != nil {
	return Result{}, fmt.Errorf("poller: pull: %w", err)
}
```

- **Expected:** Pull or list failure returns an empty Result and a wrapped error.

### Step 2 — `backend/worker/internal/poller/poller.go` · `Poller.Poll (OPEN expired case)` · the OPEN case added by act-close
- **Do:** Before calling p.closer.Close, if p.closer == nil append errors.New("poller: no closer configured") to errs and continue.

```
if p.closer == nil {
	errs = append(errs, errors.New("poller: no closer configured"))
	continue
}
```

- **Expected:** A nil Closer produces an error and no panic.

## Acceptance criteria
- Pull and List errors return Result{} wrapped with %w.
- A nil Closer yields an error for an expired Round.

## Definition of done
- poller.go builds with the error semantics
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-218.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-043
- Requirement: REQ-110
- Unit (Act): UNIT-218
- Unit (Verify): UNIT-221
- Status: completed
- Change: UPDATE
