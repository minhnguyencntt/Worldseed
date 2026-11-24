---
id: "01M85GJGAX45VNX5JKP0N456WJ"
kind: requirement
parent: 01M85GJGAW0FWZZZVYNQQZNE89
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Escape, focus trap and focus restore are asserted for the dialog

Context: Radix Dialog supplies Escape and focus trap; onCloseAutoFocus restores focus to returnFocusRef. Desired behavior: Close button has a test id; tests assert the three behaviours directly on ContributionSheet. Why: SG-8.5 keyboard coverage.

## Acceptance criteria
- Given an open sheet, when Escape is pressed, then onClose is called once
- Given a button outside the dialog, when it is focused while the sheet is open, then focus returns inside the dialog
- Given returnFocusRef points at a trigger, when the sheet closes, then the trigger has focus


## Scope
- In scope: Test id on Close button
- Out of scope: Changing Radix behaviour
- Preserve: onCloseAutoFocus logic


## Definition of done
- Keyboard tests pass


## Clarifying questions
- None
