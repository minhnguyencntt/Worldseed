---
id: "01M84QZDRV8T2165FKWTV1Y7RR"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.8 · Mocked-fs unit test checks every manifest.json path against present files

Context: game/public/assets/worlds/the-boys-room/manifest.json lists 14 assets. Existing tests (tests/manifestLoaderMocked.test.ts, tests/manifestDanglingMocked.test.ts) mock fs with synthetic manifests but none checks the committed manifest against a list of files. Desired behavior: a mocked-fs test reads the committed manifest and verifies every asset path is in a given list of files. Expected result: manifest and asset folders cannot drift apart unnoticed. Why: keeps manifest and assets in sync.

## Acceptance criteria
- Given the committed manifest.json and a file list that contains every manifest path, when the test runs, then no path is reported missing.
- Given a file list lacking one manifest path, when the check runs, then exactly that path is reported missing.


## Scope
- In scope: One mocked-fs unit test against the committed manifest.json
- In scope: A small pure helper to compare manifest paths with a file list
- Out of scope: Adding or changing asset files
- Out of scope: Changing manifest.json content
- Out of scope: Browser or e2e checks
- Preserve: Existing loadManifestFile and loadManifestWithFallback behavior and tests


## Technical constraints
- Vitest with vi.mock('node:fs'); no real asset directory reads in the new test


## Definition of done
- Test passes and covers every committed manifest path


## Clarifying questions
- None
