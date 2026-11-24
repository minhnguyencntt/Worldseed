---
id: "01M84J3C1WPPCAQ59P5HVH4BD6"
kind: requirement
parent: 01M84J3C1W2NRFX6H0J1MNAF5Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Config structs, example YAML and cmd wiring contain no worker or execution keys

Context: config.go defines Config with Server, Auth, Git, Hosting, Storage, Contribution, Admin and Round only; applyEnv has no worker overrides; config.example.yaml has the same sections; main.go reads only Server.Addr. Desired behavior: this stays true and is guarded so a removed key cannot return. Expected result: a test fails if a worker or execution key reappears in the struct, the example YAML or the env overrides. Why: keeps the repo free of development automation.

## Acceptance criteria
- Given the Config type, when its top-level fields are listed by reflection, then they are exactly Server, Auth, Git, Hosting, Storage, Contribution, Admin and Round
- Given config.example.yaml, when decoded into a map, then its top-level keys are exactly server, auth, git, hosting, storage, contribution, admin, round
- Given a YAML containing a worker section, when LoadFS runs, then the section is ignored and no config field carries it


## Scope
- In scope: Confirm config.go and main.go hold no removed keys
- In scope: Guard against reintroduction
- Out of scope: Changing kept keys
- Preserve: hosting.provider


## Technical constraints
- Do not add new config keys


## Definition of done
- Act confirmed, Verify test passes


## Clarifying questions
- None
