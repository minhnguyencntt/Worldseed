---
id: "01M84VMJ3AWTA69PPR3QFSHA6X"
kind: unit
parent: 01M84VMJ3AJSFYTAWV1CA5F7KZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Force cached removal of results.json in untrackNodeModules

Change the second git call in untrackNodeModules to include -f.

## Acceptance criteria
- The results.json removal call includes --cached and -f.
- The node_modules removal call is unchanged.


## Scope
- In scope: untrackNodeModules
- Out of scope: Parser
- Preserve: First rm call


## Technical constraints
- Keep --cached
- Code path: `game/frontend/src/lib/trackedNodeModules.ts`


## Definition of done
- Implementation merged; npx tsc --noEmit passes


## Clarifying questions
- None
