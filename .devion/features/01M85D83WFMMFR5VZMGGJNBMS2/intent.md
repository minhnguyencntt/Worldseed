---
id: "01M85D83WFMMFR5VZMGGJNBMS2"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.2.2 Max-length constant, counter and over-limit block

Context: ContributionSheet (game/frontend/src/components/ContributionSheet.tsx) already blocks blank submits but has no maximum length. The backend rejects prompts over cfg.Contribution.MaxPromptLen (default 500, counted with utf8.RuneCountInString on the trimmed prompt). Desired behavior: a shared max-length constant, a visible 'n / max' counter, an inline over-limit message, and submit blocked while over the limit. Expected result: players see the limit before the backend rejects them. Why: avoids a wasted round trip and a generic 'Could not send' error.

## Acceptance criteria
- Given the sheet is open, When the player types text, Then a counter reads 'n / 500' where n is the character count of the trimmed text
- Given the text is longer than the maximum, When the player looks at the form, Then an inline over-limit message is visible and the textarea is marked invalid
- Given the text is over the limit, When the player clicks Send, Then submitContribution is not called
- Given the text is within the limit, When the player clicks Send, Then submitContribution is called as before


## Scope
- In scope: Max-length constant in the API client module
- In scope: Counter and over-limit message in ContributionSheet
- In scope: Submit blocked while over the limit
- Out of scope: Backend changes
- Out of scope: Quota gating
- Out of scope: Blank-text validation changes
- Preserve: Blank-text 'Enter an idea first' behavior
- Preserve: History list and submit states
- Preserve: Radix Dialog behavior


## Technical constraints
- React + TypeScript only; no new dependencies
- Constant value must match the backend default of 500
- Count Unicode characters of the trimmed text, as the backend does


## Definition of done
- All requirements delivered and their unit tests pass


## Non-functional requirements
- Counter and message are exposed to assistive tech via aria-describedby


## Clarifying questions
- None
