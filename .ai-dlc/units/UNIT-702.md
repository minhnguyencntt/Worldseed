# UNIT-702 — Verify: App mounts PhaserHost once with BootScene and cleans up

## Summary
Unit tests with createGame and BootScene mocked prove the host replaces the flat image.

## Description
Write tests/appPhaserHost.test.tsx and migrate existing App-rendering tests so they mock Phaser.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appPhaserHost.test.tsx` · `new: App PhaserHost integration tests` · new
- **Do:** Create a test file that vi.mock's '../src/phaser/createGame' (returning a fake {destroy, scale:{setZoom, refresh}}) and '../src/phaser/BootScene' (exporting class BootScene {}), stubs ResizeObserver, renders <App/>, clicks Begin, and adds tests: (1) getByTestId('phaser-host') exists and queryByRole('img') is null; (2) createGame mock called once and its second argument contains BootScene; (3) after rerender, still one call; after unmount destroy called once with true.
- **Run:** `cd game/frontend && npx vitest run tests/appPhaserHost.test.tsx tests/app.test.tsx tests/appFlow.test.tsx tests/appContributionFocus.test.tsx tests/appHeader.test.tsx tests/appNoLegacyHeader.test.tsx tests/appRound.test.tsx tests/secretDoorPersistence.test.tsx`
- **Expected:** Three tests pass asserting host presence, BootScene passing, and single create/destroy.

### Step 2 — `game/frontend/tests/app.test.tsx` · `App tests (also appFlow, appContributionFocus, appHeader, appNoLegacyHeader, appRound, secretDoorPersistence)` · L1-L10
- **Do:** In each of these seven files add the same vi.mock for createGame and BootScene plus a ResizeObserver stub, and replace getByRole('button',{name:'Bookshelf'}) / 'Bedroom' img assertions with act(() => phaserToReact.emit('objectClick',{id:'bookshelf'})) and ActionMenu assertions; drop data-open hotspot assertions in favor of history text.
- **Run:** `cd game/frontend && npx vitest run tests/appPhaserHost.test.tsx tests/app.test.tsx tests/appFlow.test.tsx tests/appContributionFocus.test.tsx tests/appHeader.test.tsx tests/appNoLegacyHeader.test.tsx tests/appRound.test.tsx tests/secretDoorPersistence.test.tsx`
- **Expected:** All seven files run without creating real Phaser and keep their non-scene assertions green.

### Step 3 — `game/frontend/tests/appPhaserHost.test.tsx` · `run` · new
- **Do:** Run the new file and the seven migrated files only.
- **Run:** `cd game/frontend && npx vitest run tests/appPhaserHost.test.tsx tests/app.test.tsx tests/appFlow.test.tsx tests/appContributionFocus.test.tsx tests/appHeader.test.tsx tests/appNoLegacyHeader.test.tsx tests/appRound.test.tsx tests/secretDoorPersistence.test.tsx`
- **Expected:** All listed test files pass.

## Acceptance criteria
- Given Begin is clicked, when App renders, then phaser-host exists and no scene image exists.
- Given the App re-renders and unmounts, when createGame calls are counted, then it was called once and destroy(true) once.

## Definition of done
- New test file passes
- Existing App tests pass with mocks and with Bookshelf selection driven via phaserToReact.emit('objectClick')
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-702.md`

## Links
- Evidence: EVD-141
- Requirement: REQ-350
- Unit (Act): UNIT-700
- Unit (Verify): UNIT-702
- Status: completed
- Change: UPDATE
