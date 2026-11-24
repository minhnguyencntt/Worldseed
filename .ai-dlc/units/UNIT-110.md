# UNIT-110 — Act: Add LifecycleStepper and ExecutionPanel to AdminApp

## Summary
Stepper, execution panel and listExecutions client call

## Description
Implement the stepper and panel components and render them in AdminApp using the Round status, contribution count and the execution for the Round.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: ExecutionInfo, listExecutions` · after listRoundContributions
- **Do:** Export ExecutionInfo {id,world_id,round_id,status,error,updated_at, log?:string, tests?:string, release_version?:string} and listExecutions(token) GET /api/v1/admin/executions via adminRequest
- **Expected:** Returns ExecutionInfo[]

### Step 2 — `game/frontend/src/components/LifecycleStepper.tsx` · `new: LifecycleStepper, STAGES, stageIndex` · new
- **Do:** Export STAGES=['OPEN','CLOSED','ANALYZING','DEVELOPING','TESTING','PUBLISHING','COMPLETED']; stageIndex(status) maps PLANNING->DEVELOPING and BUILDING->TESTING, else index of status, -1 otherwise; component renders <ol aria-label='Round lifecycle'> of <li data-state='done|current|pending'> with aria-current='step' on current
- **Expected:** One current stage per status

### Step 3 — `game/frontend/src/components/ExecutionPanel.tsx` · `new: ExecutionPanel` · new
- **Do:** Export ExecutionPanel({execution,contributionCount}) rendering 'Contributions: N', 'Duration: ' computed from updated_at (or 'Not available' without execution), sections 'Agent logs', 'Test results', 'Release version' each showing the field or 'Not available', and 'Failure reason: <error>' when error is non-empty
- **Expected:** Fields render or fallback

### Step 4 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp` · new file from ACT-3
- **Do:** Load listExecutions(token) and pick the one whose round_id equals roundId; render <LifecycleStepper status={round.status}/> and <ExecutionPanel execution={execution} contributionCount={contributions.length}/> below the Round header
- **Expected:** Stepper and panel appear in the console

## Acceptance criteria
- Seven stages render in order
- Panel shows duration from updated_at difference
- Failure reason shown

## Definition of done
- tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-110.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-022
- Requirement: REQ-057
- Unit (Act): UNIT-110
- Unit (Verify): UNIT-115
- Status: completed
- Change: NEW
