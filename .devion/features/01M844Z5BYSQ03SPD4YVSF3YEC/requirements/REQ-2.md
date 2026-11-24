---
id: "01M844Z5BYZ5W1SYDFT22JFH6P"
kind: requirement
parent: 01M844Z5BYSQ03SPD4YVSF3YEC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Entry point resolves to App and is covered by a render test

Context: index.html loads /src/main.tsx, which calls createRoot(document.getElementById('root')!).render(<App />) with a non-null assertion that gives an opaque error if #root is absent. Desired behavior: main.tsx fails with a clear message when #root is missing and mounts App otherwise; tests prove the chain index.html -> main.tsx -> App renders. Why: entry point must resolve.

## Acceptance criteria
- Given index.html, when read, then it has a div#root and a module script with src /src/main.tsx
- Given a document with #root, when main.tsx is imported, then createRoot is called with that element and render receives the App element
- Given a document without #root, when main.tsx is imported, then it throws an error whose message is 'Root element #root not found'
- Given App rendered in a test, when no interaction occurs, then the intro Begin button is shown


## Scope
- In scope: Guard in src/main.tsx
- In scope: New entry unit tests
- Out of scope: Changing App.tsx
- Preserve: Import of ./styles.css
- Preserve: Default export App


## Technical constraints
- Keep createRoot from react-dom/client


## Definition of done
- Entry tests pass


## Clarifying questions
- None
