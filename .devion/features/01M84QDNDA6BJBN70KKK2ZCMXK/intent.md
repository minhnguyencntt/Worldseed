---
id: "01M84QDNDA6BJBN70KKK2ZCMXK"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.4 Manifest loader checks references and falls back without crashing

Context: game/src/assets/loaders/manifestLoader.ts has loadManifestFile, which validates the manifest and checks that each asset file exists on disk. It does not check that scene/object asset refs point at manifest ids, and it has no fallback: any missing file makes the whole load fail with ok:false. Desired behavior: every manifest reference is verified, missing assets are reported by id, and the loader returns a usable manifest plus a fallback asset instead of failing or throwing. Why: missing art must degrade gracefully, never crash the game.

## Acceptance criteria
- Given a scene ref that is not a manifest id, when references are checked, then the dangling ref is reported by name.
- Given a manifest asset whose file is missing, when loaded with fallback, then the missing asset is reported and the load still returns a manifest without throwing.
- Given an unreadable or malformed manifest, when loaded with fallback, then an empty manifest and the error are returned without throwing.


## Scope
- In scope: game/src/assets/loaders/manifestLoader.ts
- In scope: reference check and fallback result
- Out of scope: Phaser scene wiring
- Out of scope: new art assets
- Out of scope: changes to the manifest schema
- Preserve: loadManifestFile behavior and its existing tests
- Preserve: parseManifest and schema


## Technical constraints
- TypeScript, zod schema already in game/src/assets/manifest
- Loader must never throw
- Use node fs only inside the loader, as today


## Definition of done
- Both requirements implemented and verified by unit tests


## Clarifying questions
- None
