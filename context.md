# context.md — Worldseed (AI-DLC master index)

## Purpose
The repository tip presents a single documentation greeting: the tracked file `README.md` contains the line `hello Worldseed`. No application, library, service, CLI, or API implementation is present in the scanned product tree. Observed product purpose is therefore limited to naming/identity via that README text. Broader product goals are UNKNOWN.

## Stack
- Languages / runtimes: UNKNOWN (no `package.json`, `*.csproj`, `Cargo.toml`, `go.mod`, `pyproject.toml`, `pom.xml`, or similar manifests in the product tree)
- Frameworks: UNKNOWN
- Datastores: UNKNOWN
- Build: Devion repo config `build_cmds = ["echo no build"]` (`.devion/repos/main.toml`) — not a product build system
- Test: Devion repo config `test_cmds = ["echo no test"]` (`.devion/repos/main.toml`) — no product test suite observed
- CI/CD manifests: UNKNOWN (none in product tree)

## Modules
| Module | Path(s) | Role |
| --- | --- | --- |
| Root documentation | `README.md` | Sole tracked product content; greeting text `hello Worldseed` |
| Git ignore rules | `.gitignore` (untracked in working tree) | Lists `.devion/` cache/project/local-env/repos/agents/scans/worktrees/summary paths |

No `src/`, `app/`, `lib/`, `services/`, or test directories exist at tip. Tooling under `.devion/` is present on disk but is not product source (ignored / Devion project metadata; project name in `.devion/project.toml` is `workseed`).

## Entry points
| Kind | Path | Notes |
| --- | --- | --- |
| Documentation | `README.md` | Only human-facing entry observed |
| Executable / server / CLI `main` | UNKNOWN | No entry-point source files |
| Package / binary manifests | UNKNOWN | None found |

## Workflows
| Workflow | Status | Evidence |
| --- | --- | --- |
| Read repository greeting | Observable | Opening `README.md` yields `hello Worldseed` |
| Build product | UNKNOWN | No product build graph; stub `echo no build` in Devion config only |
| Run / serve product | UNKNOWN | No runnable modules |
| Test product | UNKNOWN | No tests; stub `echo no test` in Devion config only |
| Deploy | UNKNOWN | No deploy manifests |

## Scan meta
- Agent: Plan `atlas` (Atlas) — SCAN_ENRICH
- Repo: `main` (`/Users/mkl/projects/personal/Worldseed`)
- Default branch (Devion): `master`
- Tip SHA: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa` (commit message `init`; adds `README.md` only)
- Remote (Devion): `git@github.com:minhnguyencntt/Worldseed.git`
- Files read (product + ignore): `README.md`, `.gitignore`
- Source inventory (git tip): `README.md`
- Working-tree extras (not tip product code): `.gitignore`, `.devion/**`
- Tests found: none
- Docs found (product): `README.md` only

## Residual unknowns
- Intended product domain and features beyond the README greeting
- Implementation language(s) and architecture once code exists
- Users/actors other than a reader of `README.md`
- Automated validation / CI
- Whether project id `workseed` (`.devion/project.toml`) vs repo name `Worldseed` is intentional
- Relationship of ignored `.devion/` tooling to future product delivery

## Traceability index

| ID | Kind | Title | Status |
| --- | --- | --- | --- |
| INT-001 | intent | Repository identity greeting | draft |
| REQ-001 | requirement | README displays Worldseed greeting | draft |
| ARC-001 | architecture | Documentation-only repository root | draft |
| UNIT-001 | unit | Root README documentation | draft |
| EVD-001 | evidence | README greeting and tip inventory | draft |
| TEST-001 | validation | UNKNOWN | UNKNOWN |

## Bidirectional links
- INT-001 → REQ-001 → ARC-001 → UNIT-001 → EVD-001
- TEST-001: UNKNOWN (no tests linked)
