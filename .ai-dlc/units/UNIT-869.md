# UNIT-869 — Act: Handle SyntaxError in describeRoundError

## Summary
Return an explained message for JSON parse failures

## Description
Add a SyntaxError branch to describeRoundError in App.tsx before the generic Error branch.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `describeRoundError` · L17-L28
- **Do:** Insert a SyntaxError branch after the TypeError branch (after L23) and before the generic Error branch.

```
if (e instanceof SyntaxError) {
  return 'Round service returned an unexpected response (not JSON)';
}
```

- **Expected:** describeRoundError(new SyntaxError('Unexpected token <')) returns the explained message.

## Acceptance criteria
- SyntaxError returns the explained message
- Other branches unchanged

## Definition of done
- Branch added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-869.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-173
- Requirement: REQ-435
- Unit (Act): UNIT-869
- Unit (Verify): UNIT-871
- Status: completed
- Change: UPDATE
