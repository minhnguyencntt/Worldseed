# UNIT-288 — Act: Use Button, Lucide ChevronUp and motion.aside in GameLayout

## Summary
Wire Lucide and Motion into GameLayout

## Description
Install lucide-react and motion and update GameLayout.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies` · L10-L14
- **Do:** Add lucide-react ^0.441.0 and motion ^11.11.0 to dependencies and run npm install

```
"lucide-react": "^0.441.0", "motion": "^11.11.0"
```

- **Expected:** npm install exits 0

### Step 2 — `game/frontend/src/components/GameLayout.tsx` · `GameLayout` · L1-L20
- **Do:** Import Button from './ui/button', ChevronUp from 'lucide-react', motion from 'motion/react'. Replace <aside> with <motion.aside> keeping the className expression; replace <button> with <Button type='button' variant='ghost' ...same aria-expanded and onClick> whose children are <ChevronUp aria-hidden='true' className='h-4 w-4' /> then the text Story

```
<Button type="button" variant="ghost" aria-expanded={drawerOpen} onClick={...}><ChevronUp aria-hidden="true" className="h-4 w-4" />Story</Button>
```

- **Expected:** Existing layout tests still pass and the toggle contains an svg

## Acceptance criteria
- Given GameLayout, when rendered, then toggle is Button with icon
- Given the aside, when rendered, then it is a motion.aside with unchanged classes

## Definition of done
- Typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-288.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-057
- Requirement: REQ-145
- Unit (Act): UNIT-288
- Unit (Verify): UNIT-291
- Status: completed
- Change: UPDATE
