---
id: "01M84WBX7KJATZPD0TQB1NKDDD"
kind: requirement
parent: 01M84WBX7KX6B33TTR8240BKV0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Assets are preloaded, validated and fall back gracefully when missing

Context: assets/loaders/manifestLoader.ts already offers loadManifestWithFallback, checkAssetRefs and FALLBACK_ASSET_ID, but nothing turns a scene's asset refs into a preload plan. Desired behavior: a preload planner validates every object asset ref against the manifest, lists assets to load and returns a fallback texture key for any missing ref. Expected: a missing asset never throws and the object renders with the fallback. Why: broken content must not crash the game.

## Acceptance criteria
- Given refs present in the manifest, when planning, then the plan lists each asset once to load
- Given a ref absent from the manifest, when resolving, then the fallback texture key is returned and the ref is reported in missing
- Given a ref whose texture failed to load, when resolving, then the fallback key is returned without throwing
- Given duplicate refs, when planning, then each asset is loaded once


## Scope
- In scope: game/src/assets/loaders/preload.ts
- In scope: WorldScene preload() using the plan
- Out of scope: Changing manifest schema
- Preserve: checkAssetRefs and loadManifestWithFallback behavior


## Technical constraints
- Reuse checkAssetRefs and FALLBACK_ASSET_ID


## Definition of done
- Planner exported and used by WorldScene


## Non-functional requirements
- Avoid loading unreferenced assets


## Clarifying questions
- None
