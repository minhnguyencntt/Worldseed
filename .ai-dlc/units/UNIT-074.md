# UNIT-074 — Act: Add admin Middleware and Admin/Round config

## Summary
Create middleware and extend config

## Description
Implement admin.Middleware and config AdminConfig, RoundConfig.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/admin/middleware.go` · `new: Middleware` · new
- **Do:** Middleware(token string) func(http.Handler) http.Handler: reject with http.Error(w,"unauthorized",401) when token=="" or the Authorization header lacks the "Bearer " prefix or sha256 digests differ under subtle.ConstantTimeCompare; otherwise call next
- **Expected:** Only the correct bearer token passes

### Step 2 — `backend/internal/config/config.go` · `Config, AdminConfig, RoundConfig, LoadFS, applyEnv` · L21-L28, L111-L126, L128-L140
- **Do:** Add Admin AdminConfig{Token string yaml:"token"} and Round RoundConfig{Duration time.Duration yaml:"duration"; BaseRelease string yaml:"base_release"; SchedulerInterval time.Duration yaml:"scheduler_interval"} to Config; in LoadFS default Duration 24h, BaseRelease "1.0.0", SchedulerInterval 30s when zero/empty; in applyEnv add override(&cfg.Admin.Token, "STORYFORGE_ADMIN_TOKEN")
- **Expected:** Defaults and env override apply

### Step 3 — `backend/configs/config.example.yaml` · `admin, round keys` · after L30
- **Do:** Append `admin:\n  token: ""` and `round:\n  duration: "24h"\n  base_release: "1.0.0"\n  scheduler_interval: "30s"`
- **Expected:** Example config documents new keys

## Acceptance criteria
- 401 body is plain text unauthorized
- Env STORYFORGE_ADMIN_TOKEN overrides admin.token

## Definition of done
- go build ./...
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-074.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-015
- Requirement: REQ-039
- Unit (Act): UNIT-074
- Unit (Verify): UNIT-080
- Status: completed
- Change: UPDATE
