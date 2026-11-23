---
id: "01M8414WGSXACPJVAPVTZ4SSJ5"
kind: unit
parent: 01M8414WGRJ0XKJKMXR6WKP2MR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Seed worlds GitOps tree and layout validator

Context: Backend module exists after ACT-BE; tip still lacks GitOps YAML.
Desired behavior: Seed world.yaml, current-release.yaml, round.yaml, enrich .env.example, README module map, and layout.go ValidateLayout over fs.FS.
Expected result: Required paths and ROUND-0000001 seed fields match REQ-GITOPS; validator checks those paths.
Why: Implements REQ-GITOPS product code only.

## Acceptance criteria
- Given Act complete, when reading round.yaml, then id ROUND-0000001, number 1, status OPEN, duration_hours 24, max_contributions_per_player 5, base_release 1.0.0.
- Given ValidateLayout, when required paths exist in an FS, then it returns nil.
- Given root .env.example and README, when opened, then module paths and example env keys are documented.


## Scope
- In scope: GitOps seed YAML at root
- In scope: root .env.example enrichment
- In scope: README StoryForge module map
- In scope: layout.go ValidateLayout
- Out of scope: *_test.go
- Out of scope: Contribution files
- Out of scope: Round services
- Out of scope: Nested worlds/ directory
- Preserve: .gitignore Devion ignores
- Preserve: game content YAML remains separate from GitOps YAML


## Technical constraints
- Depends on go.mod from ACT-BE for layout.go package main
- ValidateLayout must use fs.FS
- New file: `world.yaml`
- New file: `current-release.yaml`
- New file: `round.yaml`
- New file: `.env.example`
- Code path: `README.md`
- New file: `layout.go`


## Dependencies
- REQ-GITOPS
- ACT-BE


## Definition of done
- All code_paths created
- No test files added by this Act


## Clarifying questions
- None
