---
id: "01M855M826E3C405ZASCHH5B77"
kind: requirement
parent: 01M855M8266NY059ZY7SSJK91X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · planPreload dedupes scene asset refs and reports unknown ones

Context: SceneDef objects carry an optional asset, and dust effects carry an asset. Desired behavior: planPreload(scene, manifest) collects those refs, dedupes them in first-seen order, and splits them into ids to load and unknown ids. Expected result: a plan of the form { load, unknown }. Why: the scene must load each asset once and surface bad references.

## Acceptance criteria
- Given two objects that both use asset A, when planPreload runs, then load contains A exactly once.
- Given an object or dust effect with an id missing from the manifest, when planPreload runs, then unknown contains that id and load does not.
- Given a scene with no asset references, when planPreload runs, then load and unknown are both empty.


## Scope
- In scope: planPreload function and PreloadPlan type
- Out of scope: Loading the files in Phaser
- Preserve: SceneDef and manifest schema


## Technical constraints
- Pure function that takes the manifest as an argument


## Dependencies
- INT


## Definition of done
- planPreload is exported and returns a PreloadPlan


## Clarifying questions
- None
