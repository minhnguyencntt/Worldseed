# UNIT-368 — Verify: checkAssetRefs unit tests

## Summary
Unit tests for dangling reference detection

## Description
Test checkAssetRefs with in-memory manifests.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestRefs.test.ts` · `new: describe('checkAssetRefs')` · new
- **Do:** Create tests: (1) manifest {version:1, assets:[{id:'a',path:'a.svg',type:'image',dimensions:{width:10,height:10}}]} with refs ['a','ghost'] expects one issue whose message contains 'ghost'; (2) refs ['a'] expects []; (3) refs [] expects [].
- **Run:** `cd game && npx vitest run tests/manifestRefs.test.ts`
- **Expected:** 3 tests pass.

## Acceptance criteria
- Unknown ref reported by name
- All-known and empty refs give []

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-368.md`

## Links
- Evidence: EVD-072
- Requirement: REQ-183
- Unit (Act): UNIT-366
- Unit (Verify): UNIT-368
- Status: completed
- Change: UPDATE
