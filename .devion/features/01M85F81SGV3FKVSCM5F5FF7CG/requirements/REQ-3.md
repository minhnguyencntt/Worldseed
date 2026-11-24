---
id: "01M85F81SGRD4T42R33VF5ST2K"
kind: requirement
parent: 01M85F81SGV3FKVSCM5F5FF7CG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · History effect never updates state after it is cancelled

Context: the effect has a cancelled flag checked only in .then; .catch has no guard. Desired behavior: every state write (status and entries) in both .then and .catch is skipped once the cleanup ran. Expected result: no updates after close, roundId change or unmount. Why: avoid stale or leaked updates.

## Acceptance criteria
- Given the sheet closes while listMine is pending, When it later rejects, Then no error message is rendered on reopen before the new load settles
- Given roundId changes while the first request is pending, When the first resolves, Then its entries are not added
- Given the component unmounts, When listMine settles, Then no React state-update warning is logged


## Scope
- In scope: cancelled checks in then and catch
- Out of scope: AbortController or client changes
- Preserve: Merge of history with in-flight sent entries


## Technical constraints
- Guard by local cancelled flag set in effect cleanup


## Dependencies
- R1


## Definition of done
- Both promise branches guarded


## Clarifying questions
- None
