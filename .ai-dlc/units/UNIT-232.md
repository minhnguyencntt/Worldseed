# UNIT-232 — Act: Delete the backend/worker module

## Summary
Remove every file under backend/worker.

## Description
Delete the entire backend/worker directory: go.mod, go.sum, configs/config.example.yaml and internal/{poller,config,recovery,runner,lock,provider,report,logging,store}.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker` · `directory backend/worker` · L1-end
- **Do:** Run git rm -r backend/worker to delete the module, all its packages and every *_test.go file inside it.
- **Run:** `cd backend && git rm -r -q worker && test ! -e worker`
- **Expected:** backend/worker no longer exists on disk or in the git index.

## Acceptance criteria
- Given the change, when backend/worker is listed, then it does not exist.
- Given backend/, when searched for the worker go.mod, then none is found.

## Definition of done
- Directory deleted
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-232.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-046
- Requirement: REQ-116
- Unit (Act): UNIT-232
- Unit (Verify): UNIT-235
- Status: completed
- Change: UPDATE
