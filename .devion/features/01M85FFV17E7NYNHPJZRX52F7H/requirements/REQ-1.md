---
id: "01M85FFV17K3T244ATYVPT4QAF"
kind: requirement
parent: 01M85FFV17E7NYNHPJZRX52F7H
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Loading message is shown only while history is loading and the list stays rendered

Context: game/frontend/src/components/ContributionSheet.tsx line 47 initialises historyStatus to 'loading' and the effect at L50-L76 returns early without changing it when !open or roundId === ''. Desired behavior: with no round id or a closed sheet there is no request, so status must not be 'loading'. Expected result: the loading message is absent in that case and present while listMine is pending. Why: removes a stuck message and keeps the 401-retry test passing.

## Acceptance criteria
- Given roundId is '' when the sheet is open, then no 'Loading your suggestions…' text is rendered
- Given roundId is set and listMine is pending, then 'Loading your suggestions…' is rendered and the list 'Your suggestions' exists
- Given the 401-retry scenario with roundId '', then the three ordered POST calls occur and the list shows 'Sent'


## Scope
- In scope: historyStatus initial value and early-return branch in ContributionSheet
- Out of scope: Retry button behavior
- Out of scope: Error message text
- Preserve: HISTORY_LOADING and HISTORY_ERROR texts
- Preserve: Cancellation guard in the effect


## Technical constraints
- Keep the single-writer history status in ContributionSheet


## Definition of done
- Behavior matches acceptance criteria


## Clarifying questions
- None
