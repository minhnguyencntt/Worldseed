---
id: "01M84QZDRVNM7KF5TMY7VCNGEJ"
kind: requirement
parent: 01M84QZDRV8T2165FKWTV1Y7RR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Every committed manifest path is checked against a list of present files with fs mocked

Context: loadManifestFile checks existence per asset via existsSync but offers no reusable comparison against a file list. Desired behavior: an exported pure helper returns manifest asset paths absent from a supplied file list; the test feeds it the committed manifest read through mocked fs. Expected result: drift between manifest.json and asset folders fails the test. Why: prevents silent drift.

## Acceptance criteria
- Given the committed manifest and a list of all its paths, when the helper runs, then it returns an empty array.
- Given the list with one path removed, when the helper runs, then it returns that single path.
- Given node:fs is mocked, when the test runs, then no real asset file is touched.


## Scope
- In scope: findMissingAssetPaths helper
- In scope: Mocked-fs test of committed manifest
- Out of scope: Asset creation
- Out of scope: Schema changes
- Preserve: Existing loader exports


## Technical constraints
- Helper must be pure and not throw


## Definition of done
- Helper exported and tested


## Clarifying questions
- None
