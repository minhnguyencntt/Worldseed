# UNIT-633 — Act: Add max length, counter and over-limit message to ContributionSheet

## Summary
Counter and length gating

## Description
Add MAX_PROMPT_LENGTH constant and render a counter plus over-limit message, gating submit.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `MAX_PROMPT_LENGTH` · after L2
- **Do:** Export the constant matching the backend default max_prompt_len.

```
export const MAX_PROMPT_LENGTH = 500;
```

- **Expected:** Constant importable from client

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (length state)` · L2, L64-L69
- **Do:** Import MAX_PROMPT_LENGTH; add const length = text.trim().length and const tooLong = length > MAX_PROMPT_LENGTH; in handleSubmit add 'if (tooLong) { setError("Idea is too long"); return; }' after the blank check.

```
const tooLong = text.trim().length > MAX_PROMPT_LENGTH;
```

- **Expected:** Over-limit submit is rejected before submitContribution

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `textarea and Send markup` · L102-L108
- **Do:** Add aria-describedby='contribution-count' to the textarea; after it render <p id='contribution-count'>{`${text.length}/${MAX_PROMPT_LENGTH}`}</p>; render <p role='alert'>Idea is too long</p> when tooLong; change Send to disabled={isBlank || tooLong}.

```
<p id="contribution-count">{`${text.length}/${MAX_PROMPT_LENGTH}`}</p>
```

- **Expected:** Counter visible, message shown when over limit, Send disabled

## Acceptance criteria
- Counter reads N/500
- Over-limit text disables Send and shows 'Idea is too long'

## Definition of done
- Length rule enforced in UI
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-633.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-127
- Requirement: REQ-317
- Unit (Act): UNIT-633
- Unit (Verify): UNIT-636
- Status: approved
- Change: UPDATE
