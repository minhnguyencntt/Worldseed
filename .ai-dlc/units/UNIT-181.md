# UNIT-181 — Verify: Worker config new-field defaults and overrides unit tests

## Summary
Unit tests for defaults and explicit values

## Description
Add tests in config_test.go with fstest.MapFS proving defaults and explicit values.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/config/config_test.go` · `new: TestLoadFS_NewFieldDefaults` · after L43
- **Do:** Load YAML "worker:\n  repo_path: /r\n" via fstest.MapFS and noEnv; assert WorkRoot==".storyforge/work", MaxBudget==5, AutoPublish==false, ProviderKind=="mock".
- **Run:** `cd backend/worker && go test ./internal/config -run TestLoadFS_NewFieldDefaults`
- **Expected:** Test passes.

### Step 2 — `backend/worker/internal/config/config_test.go` · `new: TestLoadFS_NewFieldExplicit` · new
- **Do:** Load YAML with repo_path /r, work_root /w, max_budget 12.5, auto_publish true, provider_kind claude; assert each field equals the input.
- **Run:** `cd backend/worker && go test ./internal/config -run TestLoadFS_NewFieldExplicit`
- **Expected:** Test passes.

## Acceptance criteria
- Defaults asserted for the four new fields
- Explicit YAML values returned unchanged

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-181.md`

## Links
- Evidence: EVD-037
- Requirement: REQ-090
- Unit (Act): UNIT-179
- Unit (Verify): UNIT-181
- Status: completed
- Change: UPDATE
