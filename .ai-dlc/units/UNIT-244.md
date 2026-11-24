# UNIT-244 — Act: Confirm config.go and the example YAML hold no worker keys

## Summary
Confirm no worker or execution key exists in Config, defaults, validation, applyEnv or YAML

## Description
Read config.go and config.example.yaml and confirm they hold no worker or execution settings. Remove any that exist; at the time of reading there are none, so no edit is expected.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/config/config.go` · `Config, applyEnv, LoadFS` · L20-L168
- **Do:** Check that struct Config lists only Server, Auth, Git, Hosting, Storage, Contribution, Admin and Round, that LoadFS has no worker default or validation, and that applyEnv has only the seven STORYFORGE_* overrides. Remove any worker or execution field found.
- **Run:** `grep -niE 'worker|execution|work_root|max_budget|auto_publish' backend/internal/config/config.go || true`
- **Expected:** No worker or execution identifier exists in config.go

### Step 2 — `backend/configs/config.example.yaml` · `top-level keys` · L1-L40
- **Do:** Check that top-level keys are server, auth, git, hosting, storage, contribution, admin, round and that hosting.provider is kept. Remove any worker or execution block found.
- **Run:** `grep -niE 'worker|execution|work_root|max_budget|auto_publish' backend/configs/config.example.yaml || true`
- **Expected:** No worker or execution key exists in the YAML

## Acceptance criteria
- Config has exactly the eight kept sections
- config.example.yaml has exactly the eight kept sections

## Definition of done
- Neither file mentions worker, execution, work_root, max_budget, auto_publish or an agent provider kind
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-244.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-048
- Requirement: REQ-122
- Unit (Act): UNIT-244
- Unit (Verify): UNIT-246
- Status: completed
- Change: UPDATE
