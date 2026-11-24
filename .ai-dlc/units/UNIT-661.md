# UNIT-661 — Act: Show the 'Sending…' loading label on the Send button

## Summary
Switch the Send button label based on the submitting state.

## Description
Render 'Sending…' as the button label while submitting is true, otherwise 'Send'. Uses the submitting state added for the disabled computation.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `Send button` · L129
- **Do:** Change the button child text from the literal 'Send' to a conditional on submitting, and expose busy state with aria-busy.

```
<button type="submit" disabled={...} aria-busy={submitting}>{submitting ? 'Sending…' : 'Send'}</button>
```

- **Expected:** While the request is pending the button reads 'Sending…'; afterwards 'Send'.

## Acceptance criteria
- Button text is 'Sending…' while submitting is true.
- Button text is 'Send' whenever submitting is false.

## Definition of done
- Label toggles with submitting
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-661.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-133
- Requirement: REQ-331
- Unit (Act): UNIT-661
- Unit (Verify): UNIT-664
- Status: completed
- Change: UPDATE
