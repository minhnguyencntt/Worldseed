# UNIT-056 — Verify: Entry point and App render unit tests

## Summary
Unit tests for index.html, main.tsx mount and guard, and App render

## Description
Test the entry chain with react-dom/client mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/entry.test.tsx` · `new: describe('entry point')` · new
- **Do:** Create file with '// @vitest-environment jsdom'. vi.mock('react-dom/client', () => ({ createRoot: vi.fn(() => ({ render: vi.fn() })) })). Test 1 reads index.html via readFileSync(join(process.cwd(),'index.html'),'utf8') and expects it to contain 'id="root"' and 'src="/src/main.tsx"', and existsSync of src/main.tsx true. Test 2: vi.resetModules, set document.body.innerHTML='<div id="root"></div>', await import('../src/main'), expect createRoot toHaveBeenCalledWith the #root element and the render mock toHaveBeenCalledOnce. Test 3: set body empty, vi.resetModules, expect(import('../src/main')).rejects.toThrow('Root element #root not found'). Test 4: render(<App />) and expect screen.getByRole('button',{name:'Begin'}) in the document.

```
await expect(import('../src/main')).rejects.toThrow('Root element #root not found');
```

- **Run:** `cd game/frontend && npx vitest run tests/entry.test.tsx`
- **Expected:** All four tests pass.

## Acceptance criteria
- index.html has div#root and script /src/main.tsx
- main.tsx calls createRoot with #root and renders App
- main.tsx throws when #root is missing
- App renders the Begin button

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-056.md`

## Links
- Evidence: EVD-011
- Requirement: REQ-028
- Unit (Act): UNIT-054
- Unit (Verify): UNIT-056
- Status: completed
- Change: UPDATE
