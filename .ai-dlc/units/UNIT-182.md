# UNIT-182 — Verify: Worker config validation unit tests

## Summary
Table test for invalid values

## Description
Add table-driven test asserting each invalid setting is rejected with key-naming error and valid ones are accepted.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/config/config_test.go` · `new: TestLoadFS_Validation` · new
- **Do:** Table cases, each YAML prefixed with 'worker:\n  repo_path: /r\n': execution_timeout: -1m -> want 'execution_timeout'; max_retries: -1 -> 'max_retries'; max_budget: -1 -> 'max_budget'; provider_kind: gpt -> 'provider_kind'. Assert err non-nil, cfg nil, err contains the key.
- **Run:** `cd backend/worker && go test ./internal/config -run TestLoadFS_Validation`
- **Expected:** All cases pass.

### Step 2 — `backend/worker/internal/config/config_test.go` · `new: TestLoadFS_ValidProviders` · new
- **Do:** For provider_kind mock and claude with repo_path /r, assert LoadFS returns nil error and ProviderKind equals the input.
- **Run:** `cd backend/worker && go test ./internal/config -run TestLoadFS_ValidProviders`
- **Expected:** Test passes.

## Acceptance criteria
- Each invalid input yields nil config and error naming the key
- mock and claude accepted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-182.md`

## Links
- Evidence: EVD-037
- Requirement: REQ-091
- Unit (Act): UNIT-180
- Unit (Verify): UNIT-182
- Status: completed
- Change: UPDATE
