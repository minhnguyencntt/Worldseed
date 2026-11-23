# UNIT-001 — Verify: Frontend config loader unit tests

## Summary
Add Vitest and unit tests proving loadFrontendConfig defaults and overrides.

## Description
Context: ACT-FE added loadFrontendConfig without tests.
Desired behavior: Add Vitest wiring and config.test.ts that asserts defaults and env overrides with plain objects (no browser, no network).
Expected result: Filtered vitest run for config tests passes.
Why: Maps REQ-FE acceptance on config defaults/example keys to unit evidence.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `package.json` · `package.json scripts and vitest deps` · L1-L40
- **Do:** Add script test=vitest run and test:config=vitest run config.test.ts; add devDependencies vitest ^2.1.0. Do not change production dependencies.

```
scripts.test -> "vitest run"; scripts["test:config"] -> "vitest run config.test.ts"; devDependencies.vitest -> "^2.1.0"
```

- **Run:** `npm install && npm run test:config`
- **Expected:** package.json includes vitest scripts; install succeeds as prerequisite for the test command.

### Step 2 — `vitest.config.ts` · `new: defineConfig` · new
- **Do:** Create vitest.config.ts using vitest/config defineConfig with test.environment node and include **/*.test.ts.

```
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
  },
})
```

- **Run:** `npm run test:config`
- **Expected:** Vitest loads this config when running config tests.

### Step 3 — `config.test.ts` · `new: loadFrontendConfig defaults and overrides` · new
- **Do:** Create tests: (1) loadFrontendConfig({}) expects apiBaseUrl http://localhost:8080 and appName StoryForge; (2) loadFrontendConfig({ VITE_API_BASE_URL: 'http://api.test', VITE_APP_NAME: 'SF-Test' }) expects those override values. Import from ./config.

```
import { describe, expect, it } from 'vitest'
import { loadFrontendConfig } from './config'

describe('loadFrontendConfig', () => {
  it('applies defaults when env keys are missing', () => {
    expect(loadFrontendConfig({})).toEqual({
      apiBaseUrl: 'http://localhost:8080',
      appName: 'StoryForge',
    })
  })

  it('uses provided VITE overrides', () => {
    expect(
      loadFrontendConfig({
        VITE_API_BASE_URL: 'http://api.test',
        VITE_APP_NAME: 'SF-Test',
      }),
    ).toEqual({ apiBaseUrl: 'http://api.test', appName: 'SF-Test' })
  })
})
```

- **Run:** `npm run test:config`
- **Expected:** Both loadFrontendConfig unit tests pass.

## Acceptance criteria
- Given empty env object, when loadFrontendConfig runs in the unit test, then apiBaseUrl is http://localhost:8080 and appName is StoryForge.
- Given env overrides VITE_API_BASE_URL and VITE_APP_NAME, when loadFrontendConfig runs, then returned fields equal the overrides.

## Definition of done
- Vitest config and config.test.ts exist
- Command for this unit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-001.md`

## Links
- Evidence: EVD-002
- Requirement: REQ-002
- Unit (Act): UNIT-002
- Unit (Verify): UNIT-001
- Status: completed
- Change: UPDATE
