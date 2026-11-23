---
id: "01M8414WGR17QT0BMYRJPZ02TC"
kind: requirement
parent: 01M8414WGQ1RMYSRBG9KKP4J3W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Game module runtime separated from content

Context: No game sources exist.
Desired behavior: Separate runtime (`runtime.ts`) from content (`world-content.yaml`, `bedroom.yaml`), with a content loader that parses world YAML from an injected string source.
Expected result: Runtime exports a minimal `createRuntime` stub; content includes the-boys-room world YAML; loader returns typed world id/title without touching network.
Why: Coding agents must extend content without rewriting engine layout.

## Acceptance criteria
- Given the repository after this requirement, when inspecting the root, then `runtime.ts` and `world-content.yaml` exist as separate runtime vs content files.
- Given `world-content.yaml` text with `id: the-boys-room` and `title: The Boy's Room`, when `loadWorldFromYaml` parses it, then it returns matching `id` and `title`.
- Given root `package.json`, when opened, then it names the package and includes TypeScript tooling without embedding world prose into `runtime.ts`.


## Scope
- In scope: runtime.ts engine stub
- In scope: world-content.yaml and bedroom.yaml declarative content
- In scope: YAML world loader function
- In scope: yaml dependency on root package.json
- Out of scope: Clickable objects, dialogue/choice engines, inventory
- Out of scope: Pixel art assets
- Out of scope: React 80/20 UI
- Out of scope: Nested game/ directory tree
- Preserve: Runtime vs content file separation


## Technical constraints
- Mandatory: declarative YAML content in world-content.yaml / bedroom.yaml
- Mandatory: reusable runtime in runtime.ts
- Suggestion: TypeScript for game module to align with HTML5 delivery


## Dependencies
- INT-SG1


## Definition of done
- Game runtime/content files exist
- Linked Act and Verify units complete


## Non-functional requirements
- Loader must report parse errors for invalid YAML rather than silently succeeding


## Clarifying questions
- None
