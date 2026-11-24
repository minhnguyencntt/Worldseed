# UNIT-185 — Act: Add the approval gate before publishing

## Summary
Branch the success path on Config.AutoPublish

## Description
Edit runner.go success handling so AutoPublish false stops at AWAITING_APPROVAL with the worktree kept, and true calls Publisher.Publish then completes.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `Runner.Run step 7 success path` · the block after the failure branch that sets StatusCompleted
- **Do:** Replace with: if !r.cfg.AutoPublish { e.Status = store.StatusAwaitingApproval; e.UpdatedAt = r.now(); save; return e, nil } (no trees.Remove). Otherwise perr := r.pub.Publish(ctx, dir); if perr != nil set StatusFailed, Error, save, Remove, return e, perr; else set StatusCompleted, save, Remove, return e, nil.

```
if !r.cfg.AutoPublish { e.Status = store.StatusAwaitingApproval; ... return e, r.st.Save(e) }
```

- **Expected:** Gate blocks publish by default

## Acceptance criteria
- AutoPublish false never calls Publish
- AutoPublish true publishes and completes

## Definition of done
- go build ./internal/runner passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-185.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-038
- Requirement: REQ-094
- Unit (Act): UNIT-185
- Unit (Verify): UNIT-188
- Status: completed
- Change: UPDATE
