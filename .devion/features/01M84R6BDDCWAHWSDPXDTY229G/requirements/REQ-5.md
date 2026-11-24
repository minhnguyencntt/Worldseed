---
id: "01M84R6BDECG4WH8YMG6SMXNHW"
kind: requirement
parent: 01M84R6BDDCWAHWSDPXDTY229G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Temporary-asset replacement requirements are documented without production claims

Context: game/frontend/public/assets/README.md exists but does not list per-layer replacement requirements. Desired behavior: a new document game/docs/temporary-assets.md lists every asset group, required dimensions, frame counts and formats for replacements, and states the assets are temporary and not production-quality. Why: honesty and future replacement.

## Acceptance criteria
- Given the document, when read, then it has a section for backgrounds, furniture, objects, characters and effects
- Given the document, when searched, then it contains the word temporary and states the assets are not production-quality
- Given the document, when searched, then it names every manifest id of the new assets


## Scope
- In scope: one markdown document
- Out of scope: code changes
- Preserve: existing README.md


## Definition of done
- Document committed


## Clarifying questions
- None
