---
id: "01M843H7J6EMTMXTWFS211AMAM"
kind: unit
parent: 01M843H7J664TFSMX22768GX91
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: loadWorld strict loading unit tests

Context: loadWorld now checks fields and scene ids. Desired behavior: tests assert each error and the array result using files in an os temp dir only. Expected result: tests/loader.test.ts passes.

## Acceptance criteria
- Missing id in world.yaml makes loadWorld throw /id/
- Missing s2.yaml makes loadWorld throw /s2\.yaml/
- Scene id mismatch makes loadWorld throw /expected s/
- Valid files give an array scenes with scenes[0].id === 's'


## Scope
- In scope: backend/game/tests/loader.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Use fs.mkdtempSync under os.tmpdir(); no network or real content dir


## Dependencies
- ACT1


## Definition of done
- npx vitest run tests/loader.test.ts passes


## Clarifying questions
- None
