# UNIT-107 — Act: Add API client and ContributionSheet wired into App

## Summary
Create client.ts contribution calls, ContributionSheet and the App button

## Description
Implement api/client.ts with createSession, submitContribution, listMine, ApiError; the ContributionSheet component; and a Suggest What Happens Next button in App that toggles it.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: ApiError, request, createSession, submitContribution, listMine, WORLD_ID, MAX_PER_PLAYER` · new
- **Do:** Create the module: export WORLD_ID='the-boys-room', MAX_PER_PLAYER=5, class ApiError(status,message); request(path,init) prefixes import.meta.env.VITE_API_BASE_URL ?? '', sets credentials 'include', throws ApiError on !res.ok; createSession POSTs /api/v1/player/session; submitContribution(prompt) POSTs /api/v1/contributions with body {world_id:WORLD_ID,prompt}, on ApiError 401 calls createSession and retries once; listMine(roundId) GETs /api/v1/player/me/contributions?round_id=

```
export interface Contribution { id: string; world_id: string; round_id: string; player_id: string; prompt: string; created_at: string }
```

- **Expected:** Functions return parsed Contribution JSON and throw ApiError with the HTTP status

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `new: ContributionSheet` · new
- **Do:** Create component with props {open,onClose,roundId}; dialog role 'dialog' name 'Suggest What Happens Next' with textarea labelled 'Your idea', Send button, remaining count text 'Contributions left: N', note 'Ideas are considered when the Round closes.', and a list named 'Your suggestions' where each entry shows prompt and state sending/sent/failed; on submit call submitContribution and show error text from ApiError (429 -> 'Slow down, try again shortly', 409 -> 'Limit reached or duplicate idea', other -> 'Could not send')
- **Expected:** Sheet renders states and updates history after submit

### Step 3 — `game/frontend/src/App.tsx` · `App` · L10-L47
- **Do:** Add useState sheetOpen; inside the scene fragment render a button 'Suggest What Happens Next' that sets sheetOpen true and render <ContributionSheet open={sheetOpen} onClose={()=>setSheetOpen(false)} roundId={round?.id ?? ''} /> where round comes from props-less placeholder undefined until REQ-2 supplies it
- **Expected:** Button visible after Begin and opens the sheet

### Step 4 — `game/frontend/src/styles.css` · `new: .contribution-sheet` · after L30
- **Do:** Append .contribution-sheet rules: fixed bottom sheet, max-height 70vh, overflow-y auto, padding 1rem, textarea width 100%
- **Expected:** Sheet styled as bottom panel

## Acceptance criteria
- client.submitContribution POSTs JSON {world_id,prompt} with credentials include
- Sheet renders remaining count and Round-close note
- App shows the Suggest What Happens Next button after Begin

## Definition of done
- Component compiles under tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-107.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-022
- Requirement: REQ-054
- Unit (Act): UNIT-107
- Unit (Verify): UNIT-112
- Status: completed
- Change: UPDATE
