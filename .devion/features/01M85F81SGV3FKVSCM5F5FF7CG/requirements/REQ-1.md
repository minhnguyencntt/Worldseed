---
id: "01M85F81SG7AXQZJ73AQGRSVE8"
kind: requirement
parent: 01M85F81SGV3FKVSCM5F5FF7CG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · History status is one 'loading' | 'ready' | 'error' value with a loading message

Context: ContributionSheet has no history status and hides load failures. Desired behavior: a HistoryStatus type 'loading' | 'ready' | 'error' held in one useState, written only by the history effect, rendering a loading message while pending and an error message on failure. Expected result: players see what the history is doing. Why: visible loading.

## Acceptance criteria
- Given listMine is pending, When the sheet is open, Then 'Loading your suggestions…' is shown
- Given listMine resolves, When status becomes ready, Then the loading message is gone and entries are listed
- Given listMine rejects, When status becomes error, Then 'Could not load your suggestions' is shown in role=alert


## Scope
- In scope: HistoryStatus type and render of loading/error messages
- Out of scope: Retry
- Out of scope: Empty state
- Preserve: Existing submit feedback alerts


## Technical constraints
- Single useState<HistoryStatus>; no second boolean flag


## Definition of done
- Status type and messages implemented


## Clarifying questions
- None
