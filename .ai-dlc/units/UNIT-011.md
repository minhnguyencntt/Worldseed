# UNIT-011 — Act: Create backend module, config loader, logger and health router

## Summary
Implement go.mod, config, example YAML, router, main

## Description
Create the backend Go module and the config loader with env overrides, slog logger setup, Chi router with /healthz, and main entrypoint.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/go.mod` · `new: module` · new
- **Do:** Create module github.com/worldseed/storyforge/backend with go 1.22 requiring github.com/go-chi/chi/v5 and gopkg.in/yaml.v3

```
module github.com/worldseed/storyforge/backend

go 1.22
```

- **Expected:** go.mod exists; `go mod tidy` resolves deps

### Step 2 — `backend/configs/config.example.yaml` · `new: example config` · new
- **Do:** Add keys server.addr (":8080"), auth.token_secret ("change-me-32-bytes-minimum"), auth.cookie_name ("sf_session"), auth.token_ttl ("720h"), auth.cookie_secure (true), git.remote_url, git.branch ("main"), git.bot_name, git.bot_email, git.token, hosting.provider, hosting.base_url
- **Expected:** File parses as YAML with all listed keys

### Step 3 — `backend/internal/config/config.go` · `new: Config, Load, LoadFS` · new
- **Do:** Define Config structs with yaml tags (TokenTTL as time.Duration parsed from string). Implement LoadFS(fsys fs.FS, name string, getenv func(string) string) (*Config, error): read file, yaml.Unmarshal, then override from env STORYFORGE_ADDR, STORYFORGE_TOKEN_SECRET, STORYFORGE_GIT_REMOTE_URL, STORYFORGE_GIT_TOKEN, STORYFORGE_HOSTING_PROVIDER, STORYFORGE_HOSTING_BASE_URL when non-empty; default cookie_name to sf_session and ttl to 720h; return error if token_secret is empty. Implement Load(path string) that calls LoadFS(os.DirFS(filepath.Dir(path)), filepath.Base(path), os.Getenv)
- **Expected:** Loader returns overrides and error on empty secret

### Step 4 — `backend/internal/server/server.go` · `new: New` · new
- **Do:** Implement New(cfg *config.Config, log *slog.Logger) http.Handler building chi.NewRouter with a request-logging middleware using log.Info (method, path, status) and GET /healthz writing JSON {"status":"ok"} with Content-Type application/json
- **Expected:** Router answers /healthz with 200

### Step 5 — `backend/cmd/server/main.go` · `main` · new
- **Do:** Parse -config flag (default configs/config.example.yaml), build slog.NewJSONHandler logger on stdout, call config.Load, then http.ListenAndServe(cfg.Server.Addr, server.New(cfg, logger)); on error log and os.Exit(1)
- **Expected:** `go build ./cmd/server` succeeds

## Acceptance criteria
- Config.Load returns populated Config from YAML with env overrides
- GET /healthz returns 200 ok

## Definition of done
- `go build ./...` succeeds in backend/
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-011.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-003
- Requirement: REQ-006
- Unit (Act): UNIT-011
- Unit (Verify): UNIT-014
- Status: completed
- Change: UPDATE
