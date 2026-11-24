# UNIT-061 — Act: Add contribution handlers, config and route wiring

## Summary
POST/GET contribution routes and player history are served; routes and config are wired.

## Description
Context: server.go registers only session routes. Desired behavior: handlers for POST /api/v1/contributions, GET /api/v1/contributions/{id}, GET /api/v1/player/me/contributions identify the player from the session cookie, map service errors to HTTP statuses, and server.New wires all routes with storage and contribution limits from YAML config. Expected result: endpoints work end to end in-process. Why: expose the feature.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/handler.go` · `new: Handler, Create, Get, Mine` · new
- **Do:** Create Handler{Service *Service; Store Reader (Get(id) (Contribution, error); ListByPlayer(playerID string) ([]Contribution, error)); Secret []byte; CookieName string; TTL time.Duration; Now func() time.Time}. A playerID(r) helper reads the cookie and calls player.Verify. Create decodes {world_id, prompt}, calls Service.Submit and maps errors: ErrPromptLength 400, ErrWorldNotFound 404, ErrRoundNotOpen 409, ErrDuplicate/ErrSpam 409, ErrLimitReached/ErrRateLimited 429. Get and Mine return JSON; Get returns 404 when not found.
- **Expected:** Handlers respond with the specified statuses

### Step 2 — `backend/internal/config/config.go` · `Config, LoadFS` · L20-L25, L84-L92
- **Do:** Add fields Storage StorageConfig{RepoPath, ContentDir string} (yaml storage.repo_path, storage.content_dir) and Contribution ContributionConfig{MinPromptLen, MaxPromptLen, MaxPerPlayer, RateMax int; RateWindow time.Duration}; in LoadFS default RepoPath ".", ContentDir "game/content", MinPromptLen 3, MaxPromptLen 500, MaxPerPlayer 5, RateMax 3, RateWindow 1m.
- **Expected:** Omitted blocks yield the defaults

### Step 3 — `backend/internal/server/server.go` · `New` · L17-L37
- **Do:** After the player routes, build world.Repo{Root: cfg.Storage.RepoPath, ContentDir: cfg.Storage.ContentDir}, gitrepo.CLI{Dir, BotName: cfg.Git.BotName, BotEmail: cfg.Git.BotEmail}, contribution.FileStore, a RoundSource adapter over world.Repo.CurrentRound, contribution.Service with Limits from cfg.Contribution and Now time.Now, and register r.Get "/api/v1/worlds", "/api/v1/worlds/{id}", "/api/v1/worlds/{id}/game", "/api/v1/worlds/{id}/round/current", r.Post "/api/v1/contributions", r.Get "/api/v1/contributions/{id}" and "/api/v1/player/me/contributions".
- **Expected:** All seven routes resolve

### Step 4 — `backend/configs/config.example.yaml` · `storage, contribution` · after L21
- **Do:** Append storage: {repo_path: ".", content_dir: "game/content"} and a contribution block with min_prompt_len 3, max_prompt_len 500, max_per_player 5, rate_max 3, rate_window "1m".
- **Expected:** Example config loads with LoadFS

## Acceptance criteria
- Given no valid session cookie, when POST /api/v1/contributions runs, then 401 is returned
- Given a valid cookie and valid body {world_id, prompt}, when POST runs, then 201 with the contribution JSON is returned
- Given ErrPromptLength/ErrRoundNotOpen/ErrLimitReached/ErrRateLimited/ErrDuplicate, when POST runs, then the status is 400/409/429/429/409 respectively and ErrWorldNotFound gives 404

## Definition of done
- Product code compiles with go build ./...
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-061.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-012
- Requirement: REQ-033
- Unit (Act): UNIT-061
- Unit (Verify): UNIT-066
- Status: completed
- Change: UPDATE
