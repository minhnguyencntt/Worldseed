---
id: "01M85FFV17E7NYNHPJZRX52F7H"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.4.2 Loading message while history loads, list stays rendered

Context: ContributionSheet already renders 'Loading your suggestions…' while listMine is pending and always renders the 'Your suggestions' list. Gap: historyStatus starts as 'loading' and the history effect returns early when roundId is '' or the sheet is closed, so the message stays visible forever in that state, which the 401-retry test in tests/contribution.test.tsx uses. Desired behavior: the message appears only while a history request is in flight, and the list remains rendered so the 401-retry test still passes unchanged. Why: avoid a permanent misleading loading state.

## Acceptance criteria
- Given roundId is 'round-1' and listMine is pending, when the sheet opens, then 'Loading your suggestions…' is shown and the 'Your suggestions' list is rendered
- Given roundId is '', when the sheet opens, then 'Loading your suggestions…' is not shown and the 'Your suggestions' list is rendered
- Given the existing 401-retry test, when it runs, then it passes unchanged


## Scope
- In scope: ContributionSheet history status initialisation
- Out of scope: API client changes
- Out of scope: Retry and error UI changes
- Out of scope: Backend changes
- Preserve: Existing loading, error and Retry behavior
- Preserve: aria-label 'Your suggestions' list
- Preserve: Merge of history with in-flight entries


## Technical constraints
- React + TypeScript; keep the HistoryStatus type 'loading' | 'ready' | 'error'
- No mock data replacing the real listMine call


## Definition of done
- Loading message never persists without a request in flight
- Existing contribution tests remain green


## Clarifying questions
- None
