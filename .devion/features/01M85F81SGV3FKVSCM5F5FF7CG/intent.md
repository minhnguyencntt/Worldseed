---
id: "01M85F81SGV3FKVSCM5F5FF7CG"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.4.1 Single-writer history status in ContributionSheet

Context: ContributionSheet (game/frontend/src/components/ContributionSheet.tsx) loads history with listMine in a useEffect (L44-L66) and swallows failures silently. There is no history status. Desired behavior: one 'loading' | 'ready' | 'error' type, written only by the history effect, a reload counter in that effect's deps, and a guard against updates after the effect is cancelled. Expected result: the history list shows loading, ready or error deterministically and never updates after close, round change or unmount. Why: robust, visible history loading (SG-8.4).

## Acceptance criteria
- Given the sheet opens with a round id, When listMine is pending, Then a loading message is visible
- Given listMine rejects, When the sheet is open, Then an error message and a Retry button are visible
- Given Retry is clicked, When listMine is called again, Then status returns to loading and then ready on success
- Given the sheet closes or roundId changes before listMine settles, When the promise settles, Then no state is updated


## Scope
- In scope: HistoryStatus type, status state, reload counter and cancel guard in ContributionSheet
- Out of scope: Empty-history state
- Out of scope: Changes to api/client.ts
- Out of scope: Backend changes
- Preserve: Submit, validation, quota and feedback behavior
- Preserve: Merge of history with entries sent while loading
- Preserve: Dialog focus behavior


## Technical constraints
- Only the history effect may write the history status
- Use the existing listMine API from ../api/client


## Definition of done
- All three requirements delivered with Act and Verify units green


## Clarifying questions
- None
