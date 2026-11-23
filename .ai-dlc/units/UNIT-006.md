# UNIT-006 — Act: Seed worlds GitOps tree and layout validator

## Summary
Create ROUND-0000001 seed YAML, root env example, README map, ValidateLayout.

## Description
Context: Backend module exists after ACT-BE; tip still lacks GitOps YAML.
Desired behavior: Seed world.yaml, current-release.yaml, round.yaml, enrich .env.example, README module map, and layout.go ValidateLayout over fs.FS.
Expected result: Required paths and ROUND-0000001 seed fields match REQ-GITOPS; validator checks those paths.
Why: Implements REQ-GITOPS product code only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `world.yaml` · `new: GitOps world.yaml` · new
- **Do:** Create GitOps world.yaml with id the-boys-room, title The Boy's Room, active_round ROUND-0000001.

```
id: the-boys-room
title: The Boy's Room
active_round: ROUND-0000001
```

- **Expected:** world.yaml exists at repo root.

### Step 2 — `current-release.yaml` · `new: current-release.yaml` · new
- **Do:** Create current-release.yaml with version 1.0.0, status published, notes Initial bootstrap release pointer.

```
version: "1.0.0"
status: published
notes: Initial bootstrap release pointer
```

- **Expected:** Production release pointer file exists at 1.0.0.

### Step 3 — `round.yaml` · `new: ROUND-0000001 round.yaml` · new
- **Do:** Create round.yaml with id ROUND-0000001, number 1, status OPEN, duration_hours 24, max_contributions_per_player 5, base_release "1.0.0", allow_new_characters true, allow_new_locations true, allow_gameplay_changes true.

```
id: ROUND-0000001
number: 1
status: OPEN
duration_hours: 24
max_contributions_per_player: 5
base_release: "1.0.0"
allow_new_characters: true
allow_new_locations: true
allow_gameplay_changes: true
```

- **Expected:** ROUND-0000001 seed matches SG-1/GitOps required fields.

### Step 4 — `.env.example` · `.env.example module hints` · L1-L2
- **Do:** Extend root .env.example so it documents VITE_API_BASE_URL=http://localhost:8080, VITE_APP_NAME=StoryForge, BACKEND_CONFIG=config.example.yaml, WORKER_CONFIG=worker.config.example.yaml. No real secrets.

```
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=StoryForge
BACKEND_CONFIG=config.example.yaml
WORKER_CONFIG=worker.config.example.yaml
```

- **Expected:** Root example env points at module configs.

### Step 5 — `README.md` · `README.md StoryForge module map` · L1-L1
- **Do:** Replace documentation-only greeting with StoryForge bootstrap README that keeps a one-line Worldseed identity note and maps root-level modules: frontend (package.json/Vite), backend+worker (go.mod), game (runtime.ts + world-content.yaml), GitOps (world.yaml/round.yaml).

```
before: hello Worldseed
after:
# StoryForge

Worldseed monorepo bootstrap for StoryForge (Phase-1 root layout).

## Modules (repo root)
- Frontend — React + TypeScript + Vite (`package.json`, `main.tsx`)
- Backend — Go + Chi (`go.mod`, `main.go`, `router.go`)
- Game — runtime in `runtime.ts`, content in `world-content.yaml`
- Worker — local AI development worker (`worker.go`, `worker_config.go`)
- GitOps — `world.yaml`, `current-release.yaml`, `round.yaml`

See `.env.example` and `*.example.yaml`.
```

- **Expected:** README documents StoryForge module layout while retaining Worldseed identity context.

### Step 6 — `layout.go` · `new: ValidateLayout` · new
- **Do:** Create RequiredPaths slice listing world.yaml, current-release.yaml, round.yaml. Export ValidateLayout(fsys fs.FS) error that returns fmt.Errorf("missing required path: %s", path) for the first path where fs.Stat fails, else nil. Package main.

```
package main

import (
  "fmt"
  "io/fs"
)

var RequiredPaths = []string{
  "world.yaml",
  "current-release.yaml",
  "round.yaml",
}

func ValidateLayout(fsys fs.FS) error {
  for _, path := range RequiredPaths {
    if _, err := fs.Stat(fsys, path); err != nil {
      return fmt.Errorf("missing required path: %s", path)
    }
  }
  return nil
}
```

- **Expected:** ValidateLayout reports missing required GitOps paths via fs.FS.

## Acceptance criteria
- Given Act complete, when reading round.yaml, then id ROUND-0000001, number 1, status OPEN, duration_hours 24, max_contributions_per_player 5, base_release 1.0.0.
- Given ValidateLayout, when required paths exist in an FS, then it returns nil.
- Given root .env.example and README, when opened, then module paths and example env keys are documented.

## Definition of done
- All code_paths created
- No test files added by this Act
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-006.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-002
- Requirement: REQ-001
- Unit (Act): UNIT-006
- Unit (Verify): UNIT-010
- Status: completed
- Change: NEW
