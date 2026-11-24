# UNIT-632 — Act: Add blank-text validation to ContributionSheet

## Summary
Disable Send and show message for blank prompts

## Description
Implement blank validation in handleSubmit and render logic of ContributionSheet.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (validation state)` · L64-L69
- **Do:** Add const isBlank = text.trim() === '' after the remaining declaration; in handleSubmit replace the silent 'if (prompt === "") return;' with setError('Write your idea before sending'); return;

```
if (prompt === '') { setError('Write your idea before sending'); return; }
```

- **Expected:** Blank submit sets the error state instead of returning silently

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `Send button` · L108
- **Do:** Add disabled={isBlank} to the Send button.

```
<button type="submit" disabled={isBlank}>Send</button>
```

- **Expected:** Send is disabled while the textarea is blank

## Acceptance criteria
- Send is disabled when text.trim() is empty
- Submitting blank text shows the inline message and does not call submitContribution

## Definition of done
- Blank prompts blocked with inline role=alert message
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-632.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-127
- Requirement: REQ-316
- Unit (Act): UNIT-632
- Unit (Verify): UNIT-635
- Status: approved
- Change: UPDATE
