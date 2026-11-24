# UNIT-325 — Act: Add sound toggle and settings buttons wired to useUiStore

## Summary
Add store-wired icon buttons to HeaderOverlay

## Description
Add the sound and settings controls to the HeaderOverlay header.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/HeaderOverlay.tsx` · `HeaderOverlay` · after the Countdown block from ACT1
- **Do:** Import useUiStore from '../store/uiStore', Button from './ui/button', and Volume2, VolumeX, Settings from 'lucide-react'. Read soundEnabled, toggleSound, toggleSettings via selectors. Render a Button aria-label="Toggle sound" aria-pressed={soundEnabled} onClick={toggleSound} showing Volume2 when enabled else VolumeX, and a Button aria-label="Settings" onClick={toggleSettings} showing Settings.

```
<Button type="button" variant="ghost" aria-label="Toggle sound" aria-pressed={soundEnabled} onClick={toggleSound}>{soundEnabled ? <Volume2 aria-hidden="true" className="h-4 w-4" /> : <VolumeX aria-hidden="true" className="h-4 w-4" />}</Button>
```

- **Expected:** Two labelled buttons present and wired to the store

## Acceptance criteria
- Sound button calls toggleSound
- Settings button calls toggleSettings

## Definition of done
- Buttons render with aria-labels
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-325.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-065
- Requirement: REQ-163
- Unit (Act): UNIT-325
- Unit (Verify): UNIT-328
- Status: completed
- Change: UPDATE
