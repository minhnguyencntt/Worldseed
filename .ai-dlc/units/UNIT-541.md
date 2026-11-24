# UNIT-541 — Verify: Fallback and preload tests mock sceneSpec and pass

## Summary
Update mocks and run the two test files

## Description
Add sceneSpec to the content mocks of the two test files and confirm they pass.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFallback.test.ts` · `vi.mock('../src/runtime/content')` · L17-L28
- **Do:** Add a sceneSpec property to the returned mock object with id 'bedroom' and objects [{ id: 'bed', asset: 'objects/bed' }] mirroring the SceneSpec type.

```
sceneSpec: { id: 'bedroom', objects: [{ id: 'bed', asset: 'objects/bed' }] },
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFallback.test.ts`
- **Expected:** All tests in the file pass

### Step 2 — `game/frontend/tests/bootScenePreload.test.ts` · `vi.mock('../src/runtime/content')` · L16-L40
- **Do:** Add sceneSpec with id 'bedroom' and objects listing bed and ghost with their asset ids to the mock return value.

```
sceneSpec: { id: 'bedroom', objects: [{ id: 'bed', asset: 'objects/bed' }, { id: 'ghost', asset: 'objects/ghost' }] },
```

- **Run:** `cd game/frontend && npx vitest run tests/bootScenePreload.test.ts`
- **Expected:** All tests in the file pass

## Acceptance criteria
- Given the mocks, When BootScene loads, Then sceneSpec is defined
- Given both files, When run, Then they pass

## Definition of done
- Both files pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-541.md`

## Links
- Evidence: EVD-109
- Requirement: REQ-269
- Unit (Act): UNIT-538
- Unit (Verify): UNIT-541
- Status: approved
- Change: UPDATE
