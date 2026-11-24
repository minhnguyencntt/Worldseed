# UNIT-125 — Act: Render ExecutionPanel in AdminApp

## Summary
Import and render ExecutionPanel under the lifecycle stepper

## Description
Import ExecutionPanel in AdminApp.tsx and render it after the LifecycleStepper, passing execution and contributions.length.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `import block` · L14-L15
- **Do:** Add an import of ExecutionPanel from './ExecutionPanel' after the LifecycleStepper import.

```
import { ExecutionPanel } from './ExecutionPanel';
```

- **Expected:** ExecutionPanel is importable in AdminApp

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp` · L108-L108
- **Do:** After the line rendering <LifecycleStepper .../>, add a line rendering ExecutionPanel when round is loaded, passing the execution state and contributions.length as contributionCount.

```
{round ? <ExecutionPanel execution={execution} contributionCount={contributions.length} /> : null}
```

- **Expected:** The admin page shows the Execution region with the loaded values

## Acceptance criteria
- AdminApp output contains a region with aria-label 'Execution' once the round has loaded
- ExecutionPanel receives execution state and contributions.length

## Definition of done
- ExecutionPanel rendered in AdminApp
- tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-125.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-025
- Requirement: REQ-063
- Unit (Act): UNIT-125
- Unit (Verify): UNIT-126
- Status: completed
- Change: UPDATE
