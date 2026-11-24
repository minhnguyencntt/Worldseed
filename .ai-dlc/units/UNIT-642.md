# UNIT-642 — Act: Add MAX_PROMPT_LENGTH and the n / max counter

## Summary
Export the constant and render the counter in ContributionSheet

## Description
Add MAX_PROMPT_LENGTH = 500 to the API client and render a counter derived from the trimmed text length in ContributionSheet.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `MAX_PER_PLAYER` · after L2
- **Do:** Add an exported constant MAX_PROMPT_LENGTH with value 500 directly below MAX_PER_PLAYER

```
export const MAX_PROMPT_LENGTH = 500;
```

- **Expected:** MAX_PROMPT_LENGTH is importable and equals 500

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet` · L2 and L67
- **Do:** Import MAX_PROMPT_LENGTH from '../api/client' in the existing import on L2, then after the 'remaining' const on L67 add const length = Array.from(text.trim()).length;

```
const length = Array.from(text.trim()).length;
```

- **Expected:** length holds the trimmed character count on every render

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet textarea JSX` · L112-L127
- **Do:** After the textarea add <p id="contribution-idea-count">{`${length} / ${MAX_PROMPT_LENGTH}`}</p>; change aria-describedby on the textarea to join the ids 'contribution-idea-count' and, when validation is set, 'contribution-idea-error' with a space

```
aria-describedby={validation ? 'contribution-idea-count contribution-idea-error' : 'contribution-idea-count'}
```

- **Expected:** Counter text is visible and referenced by the textarea

## Acceptance criteria
- Counter reads 'n / 500' for the trimmed text length
- Textarea aria-describedby includes the counter id

## Definition of done
- Constant exported and counter rendered
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-642.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-129
- Requirement: REQ-321
- Unit (Act): UNIT-642
- Unit (Verify): UNIT-644
- Status: completed
- Change: UPDATE
