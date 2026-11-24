# UNIT-621 — Act: Add validation, quota gating and submit states to ContributionSheet

## Summary
Client-side validation and submit state UI

## Description
Add MAX_PROMPT_LEN to the client and implement validation, disabled/loading submit and success feedback in handleSubmit.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `MAX_PROMPT_LEN` · after L2
- **Do:** Add a new exported constant mirroring backend MaxPromptLen in backend/internal/contribution/service.go.

```
export const MAX_PROMPT_LEN = 500;
```

- **Expected:** MAX_PROMPT_LEN is importable and equals 500

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet state` · L33-L35, L66
- **Do:** Add state `const [success, setSuccess] = useState(false)` and `const [sending, setSending] = useState(false)`. Compute `const exhausted = remaining <= 0`. Import MAX_PROMPT_LEN.
- **Expected:** Component tracks sending, success and exhausted

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `handleSubmit` · L68-L85
- **Do:** After preventDefault: return early if exhausted or sending. Compute prompt = text.trim(). If prompt === '' call setError('Enter an idea before sending') and return. If Array.from(prompt).length > MAX_PROMPT_LEN call setError(`Ideas are limited to ${MAX_PROMPT_LEN} characters`) and return. Before the await call setSuccess(false) and setSending(true); on success setSuccess(true); on catch keep existing failed handling; in a finally block setSending(false).
- **Expected:** Invalid input sets an alert and never calls submitContribution; valid input sets success after resolve

### Step 4 — `game/frontend/src/components/ContributionSheet.tsx` · `form markup` · L93-L104
- **Do:** Set textarea disabled={exhausted || sending}. Set the submit button disabled={exhausted || sending} with text {sending ? 'Sending…' : 'Send'}. Below the form render <p>No contributions left</p> when exhausted, and <p role="status">Idea sent</p> when success is true.
- **Expected:** Send is disabled while sending or exhausted; status and exhausted message render

## Acceptance criteria
- Empty and over-length text produce inline alerts without a fetch
- Quota exhausted disables the form
- Success shows 'Idea sent'

## Definition of done
- Validation paths implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-621.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-125
- Requirement: REQ-311
- Unit (Act): UNIT-621
- Unit (Verify): UNIT-624
- Status: approved
- Change: UPDATE
