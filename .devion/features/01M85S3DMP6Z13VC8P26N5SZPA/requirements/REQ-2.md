---
id: "01M85S3DMPE72TZPHFV0MP1B20"
kind: requirement
parent: 01M85S3DMP6Z13VC8P26N5SZPA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · CLI entry reads and rewrites the existing app manifest

Context: the entry falls back to an empty manifest text when the file is absent, which hid the wrong path. Desired behavior: an exported createFsIo(paths, fs) builds the ArtIo from the default paths with an injected fs; the entry block uses it; a missing manifest throws instead of starting from an empty manifest. Why: the CLI must rewrite the manifest the app loads.

## Acceptance criteria
- Given a mocked fs holding the existing manifest at the default path, when runGenerateArt runs with createFsIo, then writeFileSync is called for that manifest path with merged content
- Given a mocked fs without the manifest, when readText is called, then it throws
- Given the PNG outputs, when written, then each lands under the default assetsRoot


## Scope
- In scope: createFsIo and the entry block in generateArt.ts
- Out of scope: Manifest schema changes
- Preserve: Validation via parseManifest before writing


## Technical constraints
- fs is injected so tests never touch the disk


## Dependencies
- REQ1


## Definition of done
- Entry block calls createFsIo with defaultArtPaths
- EMPTY_MANIFEST_TEXT fallback removed


## Clarifying questions
- None
