# UNIT-844 — Act: Frame StoryPanel and add portrait dialogue card with choices list

## Summary
Add portraitPath helper and rebuild the StoryPanel root, title, dialogue card and choices.

## Description
Implement a pure helper that resolves a portrait URL from the manifest and use it in StoryPanel's dialogue card; frame the root and make it scroll alone.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/storyPanelData.ts` · `new: portraitPath` · new
- **Do:** Create module importing manifestJson from '../../../public/assets/worlds/the-boys-room/manifest.json'; export portraitPath(speaker: string): string | undefined that finds the asset with id `character:${speaker}-portrait` and returns `/assets/${asset.path}`, else undefined.

```
export function portraitPath(speaker: string): string | undefined { const a = manifestJson.assets.find((x) => x.id === `character:${speaker}-portrait`); return a ? `/assets/${a.path}` : undefined; }
```

- **Expected:** portraitPath('boy') returns '/assets/worlds/the-boys-room/characters/boy-portrait.png'; unknown speaker returns undefined.

### Step 2 — `game/frontend/src/components/StoryPanel.tsx` · `StoryPanel` · L13-L49
- **Do:** Replace the root className with 'story-content sf-frame-panel h-full overflow-y-auto p-3 text-sm'. Keep h1 for sceneTitle. In the Dialogue section keep sf-frame-parchment, add a flex row with <img src={portraitPath(node.speaker)} width={32} height={32} alt='' style={{imageRendering:'pixelated'}}/> rendered only when portraitPath returns a value, then h2 speaker and p text. Render choices as <ul aria-label='Choices'> with one <li><button className='sf-btn' onClick={() => onChoose(index)}> per choice.
- **Expected:** Component renders framed panel, portrait card and a Choices list; onChoose(index) still fires.

## Acceptance criteria
- portraitPath('boy') returns /assets/worlds/the-boys-room/characters/boy-portrait.png
- portraitPath of an unknown speaker returns undefined
- StoryPanel root has sf-frame-panel and overflow-y-auto

## Definition of done
- Dialogue card shows portrait when manifest has it
- Choices render as a list of buttons
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-844.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-170
- Requirement: REQ-422
- Unit (Act): UNIT-844
- Unit (Verify): UNIT-847
- Status: completed
- Change: UPDATE
