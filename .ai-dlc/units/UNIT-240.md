# UNIT-240 — Act: Confirm no execution or worker config or dependency is used by the server package

## Summary
Server package reads no execution or worker config keys

## Description
Confirm server.go and rounds_adapter.go use only config sections Auth, Storage, Git, Contribution, Round and Admin so tests need only mocked Git and temp dirs.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/rounds_adapter.go` · `roundAdmin` · L1-L69
- **Do:** Check the adapter imports only admin, round and world packages and remove any execution reference found

```
no change expected
```

- **Expected:** No execution import

### Step 2 — `backend/internal/server/server.go` · `newRoundService` · L134-L148
- **Do:** Check that it builds round.Service from cfg.Storage and cfg.Git only, with no execution or worker field

```
no change expected
```

- **Expected:** Service built from Storage and Git config only

## Acceptance criteria
- Server code reads no execution or worker config field
- Round service is built from cfg.Storage and cfg.Git only

## Definition of done
- No execution or worker config referenced
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-240.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-047
- Requirement: REQ-121
- Unit (Act): UNIT-240
- Unit (Verify): UNIT-243
- Status: completed
- Change: UPDATE
