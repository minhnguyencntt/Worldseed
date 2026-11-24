# UNIT-189 — Act: Export store.ValidateID

## Summary
Rename validateID to ValidateID

## Description
Export the ID validator in store.go and update its callers Save and Get.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/store/store.go` · `validateID` · L61-L67
- **Do:** Rename function validateID to exported ValidateID and update its doc comment to start with 'ValidateID'

```
func validateID(id string) error -> func ValidateID(id string) error
```

- **Expected:** store.ValidateID is callable from other packages

### Step 2 — `backend/worker/internal/store/store.go` · `Store.Save, Store.Get` · L70-L72, L109-L112
- **Do:** Replace both calls validateID(e.ID) and validateID(id) with ValidateID(e.ID) and ValidateID(id)

```
validateID( -> ValidateID(
```

- **Expected:** go build ./internal/store succeeds

## Acceptance criteria
- ValidateID is exported and returns ErrInvalidID-wrapped errors for unsafe ids
- Save and Get still reject unsafe ids

## Definition of done
- Package compiles, callers updated
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-189.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-039
- Requirement: REQ-095
- Unit (Act): UNIT-189
- Unit (Verify): UNIT-192
- Status: completed
- Change: NEW
