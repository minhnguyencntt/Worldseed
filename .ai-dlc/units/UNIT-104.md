# UNIT-104 — Act: Confirm RoundHandler maps service errors via statusFor

## Summary
Confirm Get, Open and Close route errors through fail and statusFor

## Description
Read admin/rounds.go and keep handlers unchanged unless a handler bypasses fail.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/admin/rounds.go` · `RoundHandler.Get` · L125-L133
- **Do:** Confirm it calls h.Rounds.Get with world query and id param, uses fail on error and writeJSON(w, http.StatusOK, rd) on success; change nothing if so.
- **Expected:** Get maps errors via fail and returns 200 on success

### Step 2 — `backend/internal/admin/rounds.go` · `RoundHandler.Open` · L105-L112
- **Do:** Confirm it uses fail on error and writeJSON(w, http.StatusOK, rd) on success; change nothing if so.
- **Expected:** Open maps errors via fail

## Acceptance criteria
- Given Get, Open and Close, when the service errors, then fail(w, op, err) is used
- Given success, then writeJSON with 200 is used

## Definition of done
- Handlers confirmed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-104.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-021
- Requirement: REQ-053
- Unit (Act): UNIT-104
- Unit (Verify): UNIT-106
- Status: completed
- Change: UPDATE
