# UNIT-870 — Verify: Vite config proxies /api to the backend unit tests

## Summary
Unit test the dev proxy setting

## Description
Extend the node-environment viteConfig test to assert the proxy and that existing settings are kept.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/viteConfig.test.ts` · `describe('Vite dev proxy')` · after L19
- **Do:** Add a describe block with an it that reads config.server?.proxy and asserts the '/api' entry targets http://localhost:8080 (matching backend/configs server.addr ':8080'), and a second it that asserts config.server?.fs?.allow equals ['..'].

```
const proxy = config.server?.proxy as Record<string, { target: string }>;
expect(proxy['/api'].target).toBe('http://localhost:8080');
```

- **Run:** `cd game/frontend && npx vitest run tests/viteConfig.test.ts`
- **Expected:** Both new tests and the publicDir test pass.

## Acceptance criteria
- Proxy target asserted
- publicDir still ends with /game/public

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-870.md`

## Links
- Evidence: EVD-173
- Requirement: REQ-434
- Unit (Act): UNIT-868
- Unit (Verify): UNIT-870
- Status: completed
- Change: UPDATE
