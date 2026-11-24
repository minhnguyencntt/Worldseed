# UNIT-045 — Act: Rename StoryPanel root class to story-content

## Summary
Stop StoryPanel from duplicating the story-panel class

## Description
Change the root div className in StoryPanel from story-panel to story-content so only the GameLayout aside carries story-panel and the mobile fixed/transform rules apply once.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/StoryPanel.tsx` · `StoryPanel` · L12
- **Do:** Change the root element's className attribute from "story-panel" to "story-content"; do not touch any other element or prop.

```
<div className="story-panel"> -> <div className="story-content">
```

- **Expected:** StoryPanel root renders with class story-content; npm run typecheck passes in game/frontend.

## Acceptance criteria
- Given StoryPanel renders, when inspected, then the root div has class story-content
- Given GameLayout wraps StoryPanel, when rendered, then exactly one .story-panel exists

## Definition of done
- StoryPanel root div className is story-content
- No other markup changed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-045.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-009
- Requirement: REQ-023
- Unit (Act): UNIT-045
- Unit (Verify): UNIT-046
- Status: completed
- Change: UPDATE
