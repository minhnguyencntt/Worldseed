# UNIT-638 — Act: Show 'Enter an idea first' for blank submit in ContributionSheet

## Summary
Add validation state, blank branch and inline alert

## Description
Implement the blank-text validation message in ContributionSheet so blank submit is blocked visibly.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet (state)` · after L37
- **Do:** Add a new state hook `validation` holding the inline validation message, undefined by default, and a module constant BLANK_MESSAGE with the text 'Enter an idea first' placed after STATE_LABEL (L24).

```
const BLANK_MESSAGE = 'Enter an idea first';
...
const [validation, setValidation] = useState<string | undefined>(undefined);
```

- **Expected:** Component compiles with the new state and constant.

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet::handleSubmit` · L66-L69
- **Do:** Replace the silent `if (prompt === '') return;` with a branch that calls setValidation(BLANK_MESSAGE) and then returns, so submitContribution is never called for blank text.

```
if (prompt === '') return;  ->  if (prompt === '') { setValidation(BLANK_MESSAGE); return; }
```

- **Expected:** Blank or whitespace-only submit stores the message and does not call the API.

### Step 3 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet render (textarea and alert)` · L102-L111
- **Do:** On the textarea add aria-invalid={validation !== undefined} and aria-describedby={validation ? 'contribution-idea-error' : undefined}. Directly after the closing </form> render the message paragraph only when validation is set.

```
{validation && <p id="contribution-idea-error" role="alert">{validation}</p>}
```

- **Expected:** Inline alert 'Enter an idea first' appears after a blank submit and is linked to the textarea.

## Acceptance criteria
- Blank or whitespace-only submit renders role=alert 'Enter an idea first'
- submitContribution is not reached for blank text

## Definition of done
- Blank branch sets validation message and returns
- Message rendered with role=alert and linked to textarea
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-638.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-128
- Requirement: REQ-319
- Unit (Act): UNIT-638
- Unit (Verify): UNIT-640
- Status: completed
- Change: UPDATE
