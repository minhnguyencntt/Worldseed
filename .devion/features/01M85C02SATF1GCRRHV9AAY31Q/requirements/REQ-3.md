---
id: "01M85C02SBEG7ZAD8ZX633QZVB"
kind: requirement
parent: 01M85C02SATF1GCRRHV9AAY31Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Modal shows a contribution history list with loading and error states from the backend client

Context: history is fetched best-effort and failures are swallowed; entries show only prompt and state. Desired behavior: history list loaded through listMine shows prompts with status, with visible loading, empty and load-error states. Expected result: players see their prior ideas or why none appear. Why: history requirement of the intent.

## Acceptance criteria
- Given listMine resolves with contributions, when the dialog opens, then each prompt appears in the 'Your suggestions' list marked Sent
- Given listMine is pending, then 'Loading suggestions…' shows; given it resolves empty, then 'No suggestions yet' shows
- Given listMine rejects, then role=alert 'Could not load your suggestions' shows and submitting still works


## Scope
- In scope: History states in ContributionSheet
- Out of scope: New backend endpoint for other players' contributions
- Preserve: Merge of in-flight entries with loaded history


## Technical constraints
- Use listMine from client.ts only


## Definition of done
- History states render for each outcome


## Clarifying questions
- None
