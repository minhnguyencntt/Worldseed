---
id: "01M85VQ95S3EEFDY0MT6XG2E13"
kind: requirement
parent: 01M85VQ95SNXSKJ8D6N6VPHWD2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The app serves the generated PNGs and BootScene preloads them with no fallback

Context: BootScene loads from 'assets/<path>', but Vite's default publicDir is game/frontend/public, which holds stale SVG copies and no PNGs; art:generate writes to game/public/assets. Desired: publicDir points at game/public. BootScene preload, resolveKey and ensureAnim already work from the manifest and need no change. Expected: every scene id loads and registers animations from manifest frame counts. Why: otherwise the new PNGs never reach the canvas.

## Acceptance criteria
- Given vite.config.ts, when publicDir is read, then it resolves to game/public
- Given the real manifest and scene, when BootScene.preload runs, then image and spritesheet loads use assets/<png path> and spritesheet frame sizes come from the manifest
- Given every scene asset id, when resolveKey runs, then it never returns the fallback key
- Given the boy sheet, when idle, walk and interact are created, then frame arrays are 4, 6 and 4 long


## Scope
- In scope: vite.config.ts publicDir
- Out of scope: BootScene behaviour changes
- Preserve: BootScene transition, keyboard, focus and animation code


## Technical constraints
- Vite stays; Phaser stays 3.90.x


## Dependencies
- R2


## Definition of done
- Dev and build serve game/public/assets


## Clarifying questions
- None
