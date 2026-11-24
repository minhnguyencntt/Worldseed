---
id: "01M84M3003ZDP3T7RWR9VZDZ0A"
kind: unit
parent: 01M84M3002SW7T1FXRZ22VGG3V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: cn helper and Button unit tests

Test cn merging and Button variants/asChild with jsdom only.

## Acceptance criteria
- Given conflicting classes, when cn runs, then last wins
- Given asChild, when rendered, then child element is used


## Scope
- In scope: tests/ui.test.tsx
- Out of scope: Browser
- Preserve: Existing tests


## Definition of done
- Tests pass


## Clarifying questions
- None
