# UNIT-004 — Act: Scaffold game runtime and the-boys-room content

## Summary
Create createRuntime stub, world YAML content, and loadWorldFromYaml at repo root.

## Description
Context: No game module exists.
Desired behavior: Add runtime.ts stub and world-content.yaml plus loader.
Expected result: Runtime and content files are separated; loader parses world id/title from YAML text.
Why: Implements REQ-GAME product code only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `package.json` · `package.json yaml dependency` · L1-L40
- **Do:** Add dependency yaml ^2.6.0 to existing package.json dependencies without removing React/Vite entries.

```
dependencies.yaml -> "^2.6.0"
```

- **Expected:** package.json includes yaml for content loading.

### Step 2 — `runtime.ts` · `new: createRuntime` · new
- **Do:** Export type RuntimeState with worldId:string and sceneId:string; export function createRuntime(worldId:string, sceneId:string): RuntimeState that returns { worldId, sceneId }. Do not embed bedroom prose here.

```
export type RuntimeState = {
  worldId: string
  sceneId: string
}

export function createRuntime(worldId: string, sceneId: string): RuntimeState {
  return { worldId, sceneId }
}
```

- **Expected:** createRuntime returns initial runtime state ids only.

### Step 3 — `loadWorld.ts` · `new: loadWorldFromYaml` · new
- **Do:** Export type WorldManifest { id:string; title:string; startingScene:string }; export function loadWorldFromYaml(source:string): WorldManifest that parses YAML via yaml.parse, requires string fields id, title, startingScene, and throws Error with message mentioning the missing field if any is missing/non-string.

```
import { parse } from 'yaml'

export type WorldManifest = {
  id: string
  title: string
  startingScene: string
}

export function loadWorldFromYaml(source: string): WorldManifest {
  const data = parse(source) as Record<string, unknown>
  for (const key of ['id', 'title', 'startingScene'] as const) {
    if (typeof data[key] !== 'string' || data[key] === '') {
      throw new Error(`world.yaml missing string field: ${key}`)
    }
  }
  return {
    id: data.id as string,
    title: data.title as string,
    startingScene: data.startingScene as string,
  }
}
```

- **Expected:** loadWorldFromYaml returns typed manifest or throws on missing fields.

### Step 4 — `world-content.yaml` · `new: the-boys-room world-content.yaml` · new
- **Do:** Create world-content.yaml with id the-boys-room, title The Boy's Room, startingScene bedroom.

```
id: the-boys-room
title: The Boy's Room
startingScene: bedroom
```

- **Expected:** Declarative world manifest exists as world-content.yaml.

### Step 5 — `bedroom.yaml` · `new: bedroom.yaml` · new
- **Do:** Create minimal bedroom scene YAML with id bedroom, title Bedroom, and description stating a quiet morning bedroom stub for Phase-1 (no interaction graph required yet).

```
id: bedroom
title: Bedroom
description: A quiet morning in a boy's bedroom. Phase-1 content stub.
```

- **Expected:** bedroom.yaml exists separate from engine source.

## Acceptance criteria
- Given Act complete, when inspecting the root, then runtime.ts and world-content.yaml both exist.
- Given YAML text for the-boys-room, when loadWorldFromYaml parses it, then id and title match the content file.

## Definition of done
- All code_paths created
- No test files added by this Act
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-004.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-002
- Requirement: REQ-004
- Unit (Act): UNIT-004
- Unit (Verify): UNIT-008
- Status: completed
- Change: NEW
