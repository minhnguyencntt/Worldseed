# UNIT-008 — Verify: Game world loader and runtime wiring unit tests

## Summary
Add Vitest proving loadWorldFromYaml and createRuntime with fixture YAML text.

## Description
Context: ACT-GAME added loader/runtime without tests.
Desired behavior: Unit tests parse fixture YAML string mirroring world-content.yaml contract and wire createRuntime; invalid YAML missing id throws.
Expected result: Filtered vitest for game content/runtime tests passes with no filesystem reads of the real repo.
Why: Covers REQ-GAME loader and runtime/content separation wiring.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `package.json` · `package.json test:game script` · L1-L40
- **Do:** Add script test:game=vitest run loadWorld.test.ts runtime.test.ts. Keep existing vitest dependency from VRF-FE.

```
scripts["test:game"] -> "vitest run loadWorld.test.ts runtime.test.ts"
```

- **Run:** `npm install && npm run test:game`
- **Expected:** test:game script is available for filtered game unit tests.

### Step 2 — `loadWorld.test.ts` · `new: loadWorldFromYaml tests` · new
- **Do:** Add fixture constant WORLD_YAML matching contract of world-content.yaml (id/title/startingScene). Test parse success; test missing id throws matching /id/.

```
import { describe, expect, it } from 'vitest'
import { loadWorldFromYaml } from './loadWorld'

const WORLD_YAML = `id: the-boys-room\ntitle: The Boy's Room\nstartingScene: bedroom\n`

describe('loadWorldFromYaml', () => {
  it('parses the-boys-room manifest', () => {
    expect(loadWorldFromYaml(WORLD_YAML)).toEqual({
      id: 'the-boys-room',
      title: "The Boy's Room",
      startingScene: 'bedroom',
    })
  })

  it('throws when id is missing', () => {
    expect(() => loadWorldFromYaml('title: X\nstartingScene: bedroom\n')).toThrow(/id/)
  })
})
```

- **Run:** `npx vitest run loadWorld.test.ts`
- **Expected:** loadWorldFromYaml unit tests pass against the world-content.yaml contract fixture.

### Step 3 — `runtime.test.ts` · `new: createRuntime test` · new
- **Do:** Test createRuntime('the-boys-room','bedroom') returns { worldId:'the-boys-room', sceneId:'bedroom' }.

```
import { describe, expect, it } from 'vitest'
import { createRuntime } from './runtime'

describe('createRuntime', () => {
  it('wires world and scene ids', () => {
    expect(createRuntime('the-boys-room', 'bedroom')).toEqual({
      worldId: 'the-boys-room',
      sceneId: 'bedroom',
    })
  })
})
```

- **Run:** `npx vitest run runtime.test.ts`
- **Expected:** createRuntime unit test passes.

## Acceptance criteria
- Given fixture YAML matching world-content.yaml fields, when loadWorldFromYaml runs, then id is the-boys-room, title is The Boy's Room, startingScene is bedroom.
- Given createRuntime('the-boys-room','bedroom'), when called, then RuntimeState matches those ids.
- Given YAML missing id, when loadWorldFromYaml runs, then it throws an Error naming id.

## Definition of done
- Tests exist
- Filtered test command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-008.md`

## Links
- Evidence: EVD-002
- Requirement: REQ-004
- Unit (Act): UNIT-004
- Unit (Verify): UNIT-008
- Status: completed
- Change: UPDATE
