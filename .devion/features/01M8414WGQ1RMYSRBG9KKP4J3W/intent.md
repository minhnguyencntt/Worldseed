---
id: "01M8414WGQ1RMYSRBG9KKP4J3W"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1 · Bootstrap StoryForge monorepo modules

Context: Tip product tree is documentation-only (`README.md` = `hello Worldseed`); no application modules exist and the repo has no product top-level folders yet.
Desired behavior: Repository gains StoryForge Phase-1 bootstrap as root-level module files — frontend (React/TypeScript/Vite), backend+worker (one Go module with Chi + YAML), game runtime/content files, YAML configs, example env files, and GitOps world/round YAML — because new nested top-level dirs cannot be planned until those folders exist on disk.
Expected result: Root module manifests and example configs are present; unit tests for config loading and module wiring pass with filesystem and external I/O mocked.
Why: Unlocks later playable game, GitOps rounds, API, and Local Worker work once the empty-repo bootstrap lands.

## Acceptance criteria
- Given a clean clone of the repository tip, when bootstrap work for SG-1 is complete, then root-level StoryForge module files exist: `package.json`, `go.mod`, game runtime/content sources, GitOps YAML (`world.yaml`, `current-release.yaml`, `round.yaml`), and updated `README.md`.
- Given the bootstrapped modules, when config-loading and module-wiring unit tests run with filesystem and external I/O mocked, then those unit tests pass.
- Given example env and YAML config files, when an engineer opens the repo, then required keys are documented via `.env.example` and `*.example.yaml` without requiring live services.


## Scope
- In scope: Scaffold frontend React/TypeScript/Vite files at repo root
- In scope: Scaffold Go Chi backend and worker in one root Go module with YAML config loading
- In scope: Scaffold game runtime vs content as separate root source/content files
- In scope: Create GitOps world/round YAML and root example env
- In scope: Unit tests for config loading and module wiring with mocked FS/I/O
- Out of scope: Playable Boy's Room gameplay and 80/20 UI beyond stubs
- Out of scope: REST contribution/admin APIs beyond minimal backend wiring
- Out of scope: Round lifecycle state machine beyond seed YAML
- Out of scope: Local Worker AI pipeline, Claude Code CLI, release publishing
- Out of scope: Databases, message queues, Firebase, or microservices
- Out of scope: Creating nested top-level folders that do not yet exist on disk
- Preserve: .gitignore Devion ignore entries
- Preserve: No database, queue, or Firebase introduction
- Preserve: Git as intended durable store for worlds/rounds data


## Technical constraints
- Mandatory stack: frontend React+TypeScript+Vite; backend Go+Chi; worker Go
- Mandatory: YAML configuration for Go services; no PostgreSQL/MongoDB/MySQL/Redis
- Mandatory: separate game runtime source from declarative content; separate GitOps YAML from game content files
- Mandatory (empty tip): Act code_paths and step files must be repository-root files until product top-level directories exist
- Suggestion: keep Phase-1 entrypoints minimal (health/stub) so later phases can extend


## Definition of done
- All SG-1 requirements have linked Act and Verify units completed
- Config/wiring unit tests for each module slice pass with mocked I/O
- Evidence ticket can cite those Verify results


## Non-functional requirements
- Module layout must remain simple and navigable for future coding agents
- Secrets must not be committed; only example env/config files
- Phase-1 files stay at repository root until top-level module folders exist on disk for later reorganizations


## Clarifying questions
- None
