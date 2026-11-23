---
id: "01M8414WGSZ6XJ2VG84786K1MJ"
kind: unit
parent: 01M8414WGRJ0XKJKMXR6WKP2MR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: GitOps layout validator and round seed YAML unit tests

Context: ACT-GITOPS added ValidateLayout and seed YAML without tests.
Desired behavior: Unit-test layout success/failure with MapFS; unit-test round seed decoding from a fixture that mirrors round.yaml contract.
Expected result: Filtered go test for layout/round seed passes without reading the real repository disk.
Why: Proves REQ-GITOPS path and ROUND-0000001 seed ACs with mocked FS.

## Acceptance criteria
- Given MapFS containing all RequiredPaths, when ValidateLayout runs, then error is nil.
- Given MapFS missing round.yaml, when ValidateLayout runs, then error message contains missing required path and round.yaml.
- Given fixture YAML mirroring round.yaml contract, when decoded into a RoundSeed struct in the test file, then id/number/status/duration/max/base_release match OPEN seed values.


## Scope
- In scope: layout_test.go
- Out of scope: Live git commands
- Out of scope: E2E round services
- Preserve: ValidateLayout and seed file contracts from ACT-GITOPS


## Technical constraints
- Use testing/fstest.MapFS; fixture YAML must mirror round.yaml
- No real filesystem dependency on repo checkout for assertions


## Dependencies
- ACT-GITOPS


## Definition of done
- layout_test.go covers success, missing path, and round seed field assertions
- Filtered go test passes


## Clarifying questions
- None
