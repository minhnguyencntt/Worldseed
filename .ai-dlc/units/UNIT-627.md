# UNIT-627 — Act: Rebuild ContributionSheet on the Dialog parts

## Summary
Wrap ContributionSheet markup in Dialog with title and description

## Description
Replace the div role=dialog in ContributionSheet.tsx with Dialog, DialogContent, DialogTitle and DialogDescription.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet` · L1-L2
- **Do:** Add import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog'.

```
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
```

- **Expected:** Import resolves

### Step 2 — `game/frontend/src/components/ContributionSheet.tsx` · `ContributionSheet` · L62-L64, L87-L118
- **Do:** Delete the early return null for !open. Replace the outer div with <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}><DialogContent className="contribution-sheet">. Replace the h2 with <DialogTitle>Suggest What Happens Next</DialogTitle> and the closing-note p with <DialogDescription>Ideas are considered when the Round closes.</DialogDescription>. Keep the remaining-count p, form, alert, list and Close button unchanged inside DialogContent, then close the tags.

```
<Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}><DialogContent className="contribution-sheet">...</DialogContent></Dialog>
```

- **Expected:** open=false renders no dialog; open=true renders role=dialog named Suggest What Happens Next

## Acceptance criteria
- Escape and overlay dismissal call onClose via onOpenChange
- Title and description are Radix Title and Description

## Definition of done
- Sheet renders through Dialog
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-627.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-126
- Requirement: REQ-314
- Unit (Act): UNIT-627
- Unit (Verify): UNIT-630
- Status: completed
- Change: UPDATE
