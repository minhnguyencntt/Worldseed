---
id: "01M85Z6HPB18DCCYJF9H3DN26C"
kind: requirement
parent: 01M85Z6HPB3EZNCVMBB2CEW7YV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Every object and action is reachable by keyboard and screen reader from game state

Context: BootScene.onKeyDown moves focus with Tab/arrows, writes focusedObjectId to the store, and Enter/Space activate the focused object via objectClick. Nothing announces the focus and the DOM has no labelled list of objects. Desired: the overlay region has role=group with aria-label from the object name, buttons carry aria-label like 'Inspect Old Bookshelf', Enter on a focused object moves DOM focus to its first action button, Tab/arrows/Enter/Space then work between action buttons, Escape closes via menuClose, and an aria-live=polite region announces the focused object and its actions from the same store state. Expected result: usable without a mouse or sight. Why: Done-when 3.9.

## Acceptance criteria
- Given focusedObjectId changes to bookshelf, When the live region renders, Then it contains the object name and its action labels
- Given an object is selected, When the overlay renders, Then each button has an aria-label combining action label and object name
- Given focus is on an action button, When Enter or Space is pressed, Then game.act is called for that action
- Given the overlay is open, When Escape is pressed, Then menuClose clears the selection


## Scope
- In scope: ARIA labels and live region
- In scope: DOM focus move to actions
- In scope: Escape close
- Out of scope: Screen-reader testing in a real browser
- Preserve: BootScene key mapping
- Preserve: focusChange and menuClose events


## Technical constraints
- Labels come from the same game state and content as the visuals
- Radix and Tailwind stay


## Dependencies
- REQ2


## Definition of done
- Live region and labels implemented in ObjectOverlay


## Non-functional requirements
- Announcements use aria-live polite


## Clarifying questions
- None
