# UNIT-041 — Act: Create App.tsx with the intro gate

## Summary
Create App default export rendering IntroScreen until Begin

## Description
Create game/frontend/src/App.tsx with a default-exported App holding a begun state; when false render IntroScreen with onBegin setting it true; when true render a placeholder fragment filled in by the next Act.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `new: App` · new
- **Do:** Create the file with a default-exported function App that calls useState(false) as [begun, setBegun], returns <IntroScreen onBegin={() => setBegun(true)} /> when begun is false, and returns <></> when true.

```
import { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';

export default function App() {
  const [begun, setBegun] = useState(false);
  if (!begun) {
    return <IntroScreen onBegin={() => setBegun(true)} />;
  }
  return <></>;
}
```

- **Expected:** cd game/frontend && npx tsc --noEmit reports no error for src/main.tsx importing './App'

## Acceptance criteria
- Given a fresh render, then IntroScreen is rendered
- Given Begin is clicked, then IntroScreen is no longer rendered

## Definition of done
- App.tsx exists, typechecks, and default-exports App
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-041.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-008
- Requirement: REQ-021
- Unit (Act): UNIT-041
- Unit (Verify): UNIT-043
- Status: completed
- Change: UPDATE
