# UNIT-662 — Act: Render inline success message after a successful send

## Summary
Add success state set on resolve, cleared on typing, new send or failure, and render it as role=status.

## Description
Add a 'success' string state to ContributionSheet and render 'Suggestion sent' in a role=status paragraph beside the existing error paragraph.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (state)` · L37-L40
- **Do:** Add state 'success' of type string | undefined initialised to undefined.

```
const [success, setSuccess] = useState<string | undefined>(undefined);
```

- **Expected:** New state compiles.

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `handleSubmit` · L82-L93
- **Do:** Call setSuccess(undefined) next to setError(undefined) before the request; in the try after the entries update call setSuccess('Suggestion sent'); in the catch call setSuccess(undefined) before setError.

```
try { await submitContribution(prompt); setEntries(...); setSuccess('Suggestion sent'); } catch (err) { setEntries(...); setSuccess(undefined); setError(errorMessage(err)); }
```

- **Expected:** success equals 'Suggestion sent' only after a resolved submit.

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `textarea onChange` · L116-L119
- **Do:** Add setSuccess(undefined) inside the onChange handler after setValidation(undefined).

```
setSuccess(undefined);
```

- **Expected:** Typing removes the success message.

### Step 4 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet JSX` · after L135
- **Do:** Render the success paragraph after the error paragraph.

```
{success && <p id="contribution-idea-success" role="status">{success}</p>}
```

- **Expected:** A role=status element with 'Suggestion sent' shows after success.

## Acceptance criteria
- Success message appears after resolve and not after reject.
- Success message clears on typing and on the next submit.

## Definition of done
- Success message visible only after a successful send
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-662.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-133
- Requirement: REQ-332
- Unit (Act): UNIT-662
- Unit (Verify): UNIT-665
- Status: completed
- Change: UPDATE
