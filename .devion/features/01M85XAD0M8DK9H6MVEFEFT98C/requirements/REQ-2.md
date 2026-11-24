---
id: "01M85XAD0NZN5VMA50KKS4VQF5"
kind: requirement
parent: 01M85XAD0M8DK9H6MVEFEFT98C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Pixel fonts are installed through npm @fontsource packages and imported locally

Context: no font package is in package.json. Desired: @fontsource/press-start-2p and @fontsource/vt323 as dependencies, imported in main.tsx, referenced by the type tokens. Expected: no font URL anywhere. Why: offline, deterministic fonts.

## Acceptance criteria
- Given package.json, when read, then both @fontsource packages are in dependencies
- Given main.tsx, when read, then it imports each package's 400.css
- Given src, styles.css and index.html, when scanned, then no http font URL or fonts.googleapis reference exists


## Scope
- In scope: package.json, lockfile
- In scope: main.tsx imports
- Out of scope: audio
- Out of scope: other fonts
- Preserve: existing dependencies


## Technical constraints
- Fonts bundled through npm packages, not loaded from a URL


## Dependencies
- R1 type tokens name the font families


## Definition of done
- npm install resolves and fonts import


## Clarifying questions
- None
