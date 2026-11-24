# UNIT-054 — Act: Guard the missing #root in main.tsx

## Summary
main.tsx throws a clear error when #root is absent

## Description
Replace the non-null assertion on document.getElementById('root') with an explicit check that throws 'Root element #root not found'.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/main.tsx` · `module top level (createRoot call)` · L4
- **Do:** Replace the createRoot line with a lookup of the root element, throw if it is null, then call createRoot(rootEl).render(<App />).

```
createRoot(document.getElementById('root')!).render(<App />); -> const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found');
}
createRoot(rootEl).render(<App />);
```

- **Expected:** Missing #root throws the named error; present #root renders App.

## Acceptance criteria
- main.tsx throws Error('Root element #root not found') when #root is missing
- main.tsx still renders <App /> when #root exists

## Definition of done
- tsc --noEmit still exits 0
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-054.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-011
- Requirement: REQ-028
- Unit (Act): UNIT-054
- Unit (Verify): UNIT-056
- Status: completed
- Change: UPDATE
