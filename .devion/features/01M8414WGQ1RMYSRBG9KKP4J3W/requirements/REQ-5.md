---
id: "01M8414WGRJ0XKJKMXR6WKP2MR"
kind: requirement
parent: 01M8414WGQ1RMYSRBG9KKP4J3W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Worlds GitOps paths and example env files

Context: Tip has no GitOps world/round YAML or shared example env for the monorepo.
Desired behavior: Create root GitOps seed files (`world.yaml`, `current-release.yaml`, `round.yaml` for ROUND-0000001), root `.env.example`, update `README.md` to describe StoryForge modules, and add `layout.go` ValidateLayout over `fs.FS`.
Expected result: Required GitOps paths validate via unit test using an in-memory FS mirror; example env documents backend/worker/frontend pointers.
Why: Rounds/releases must live as Git-tracked YAML separate from game engine content files.

## Acceptance criteria
- Given the repository after this requirement, when inspecting the root, then `world.yaml`, `current-release.yaml`, and `round.yaml` exist.
- Given `round.yaml`, when read, then it records `id: ROUND-0000001`, `number: 1`, `status: OPEN`, `duration_hours: 24`, `max_contributions_per_player: 5`, and `base_release: "1.0.0"`.
- Given `ValidateLayout(fs.FS)`, when the FS contains the required GitOps paths, then it returns nil; when a required path is missing, then it returns an error naming the missing path.
- Given root `.env.example`, when opened, then it documents at least `VITE_API_BASE_URL`, backend config path hint, and worker config path hint without real secrets.


## Scope
- In scope: GitOps seed YAML at repo root
- In scope: Root .env.example
- In scope: README StoryForge module map
- In scope: layout.go ValidateLayout
- Out of scope: Contribution markdown commits
- Out of scope: Round open/close services
- Out of scope: Nested worlds/ directory tree
- Preserve: Separation of GitOps YAML from game content YAML
- Preserve: .gitignore Devion ignore rules


## Technical constraints
- Mandatory: Git-tracked YAML for world/round/release metadata
- Mandatory: layout validation testable with mocked fs.FS
- Mandatory: ROUND-0000001 seed matches OPEN / 24h / max 5 / base 1.0.0


## Dependencies
- INT-SG1
- REQ-BE


## Definition of done
- GitOps YAML and examples exist
- Layout validator covered by Verify
- Linked Act and Verify units complete


## Non-functional requirements
- Do not commit noisy logs or build artifacts as source-of-truth


## Clarifying questions
- None
