---
id: "01M85D0J7QM3ANYQHFAB6ZPK28"
kind: requirement
parent: 01M85D0J7QZ95G5TP4P90XH1ZC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The blank-text message clears on typing and valid submit still works

Context: once the validation message is shown it must not linger. Desired behavior: typing in the textarea clears it, and a valid submit clears it and posts the trimmed prompt. Expected result: no stale message after correction. Why: a stale error would contradict the entered text.

## Acceptance criteria
- Given the alert is visible, when the player types into the textarea, then the alert is removed and aria-invalid is not true
- Given the alert was shown, when the player enters ' hello ' and submits, then submitContribution is called once with 'hello' and no 'Enter an idea first' alert remains


## Scope
- In scope: onChange clearing and valid-submit clearing of the validation message
- Out of scope: Changing server error display
- Preserve: Trimming of prompt
- Preserve: Entry state labels Sending/Sent/Failed


## Technical constraints
- Reuse the validation state added for the blank message


## Definition of done
- Message clears on change and on valid submit


## Clarifying questions
- None
