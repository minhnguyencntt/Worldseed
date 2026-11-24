# UNIT-660 — Act: Add submitting state and full disabled computation to ContributionSheet Send

## Summary
Track in-flight submission and disable Send for blank, over-limit, zero-quota and in-flight cases.

## Description
Add a 'submitting' boolean state to ContributionSheet, set it around the await in handleSubmit, guard re-entry, and compute the Send disabled attribute from all four conditions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (state)` · L37-L40
- **Do:** Add a boolean state 'submitting' initialised to false next to the existing validation state.

```
const [submitting, setSubmitting] = useState(false);
```

- **Expected:** Component compiles with a new submitting state.

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `handleSubmit` · L71-L94
- **Do:** Return early when submitting is true (first guard after preventDefault), call setSubmitting(true) right after the entries are queued (after L85), and call setSubmitting(false) in a finally block added to the existing try/catch.

```
if (submitting || remaining <= 0) return; ... setSubmitting(true); try { await submitContribution(prompt); ... } catch (err) { ... } finally { setSubmitting(false); }
```

- **Expected:** A second submit while the first promise is pending is ignored; submitting returns to false after resolve or reject.

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `Send button` · L129
- **Do:** Replace the disabled prop with a computed value covering quota, blank text, over limit and in-flight.

```
disabled={remaining <= 0 || length === 0 || overLimit || submitting} (before: disabled={remaining <= 0})
```

- **Expected:** Send is disabled for blank, whitespace-only, over-limit, zero-quota and in-flight states and enabled otherwise.

## Acceptance criteria
- Send is disabled when text is blank, over limit, remaining <= 0 or submitting is true.
- handleSubmit returns early when submitting is true.

## Definition of done
- Send disabled attribute reflects all four conditions
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-660.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-133
- Requirement: REQ-330
- Unit (Act): UNIT-660
- Unit (Verify): UNIT-663
- Status: completed
- Change: UPDATE
