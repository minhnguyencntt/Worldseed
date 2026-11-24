---
id: "01M85E1KCKX3KP06FMPPWWEE92"
kind: unit
parent: 01M85E1KCJ8QXX5NXE6AYKZA9N
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Zero-quota tests assert disabled Send, message and no submit

Context: both test files render the real sheet with listMine mocked to return 5 contributions. Expected result: tests fail if the disabled prop, message or guard is removed.

## Acceptance criteria
- With 5 history entries Send is disabled and the quota message text is shown
- fireEvent.submit on the form leaves submitContribution with 0 calls


## Scope
- In scope: game/frontend/tests/contributionQuotaGate.test.tsx
- In scope: game/frontend/tests/contributionQuotaMessage.test.tsx
- Out of scope: Product code
- Preserve: tests/fixtures/api.ts


## Technical constraints
- Mock listMine with Array.from({length: MAX_PER_PLAYER}) of distinct contributionFixture prompts, mirroring the Contribution type in src/api/client.ts


## Dependencies
- ACT-QUOTA


## Definition of done
- Both quota test files pass


## Clarifying questions
- None
