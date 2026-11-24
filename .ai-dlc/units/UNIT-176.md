# UNIT-176 — Verify: Logger unit tests

## Summary
Unit tests for JSON output, level filtering and unknown level

## Description
Test logging.New with a bytes.Buffer.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/logging/logging_test.go` · `new: TestNew_JSONInfo` · new
- **Do:** New(&buf,'info'); logger.Info('hello'); json.Unmarshal buf bytes into map; assert msg=='hello' and level=='INFO'.
- **Run:** `cd backend/worker && go test ./internal/logging -run TestNew_JSONInfo`
- **Expected:** Test TestNew_JSONInfo passes (ok line printed)

### Step 2 — `backend/worker/internal/logging/logging_test.go` · `new: TestNew_LevelFilterAndUnknown` · new
- **Do:** New(&buf,'warn'); logger.Info('x'); assert buf.Len()==0; assert New(&buf,'loud') returns an error.
- **Run:** `cd backend/worker && go test ./internal/logging -run TestNew_LevelFilterAndUnknown`
- **Expected:** Test TestNew_LevelFilterAndUnknown passes (ok line printed)

## Acceptance criteria
- JSON line asserted
- Level filter asserted
- Unknown level error asserted

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-176.md`

## Links
- Evidence: EVD-036
- Requirement: REQ-087
- Unit (Act): UNIT-172
- Unit (Verify): UNIT-176
- Status: completed
- Change: UPDATE
