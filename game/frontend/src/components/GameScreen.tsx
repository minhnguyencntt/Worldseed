import { useRef, useState } from 'react';
import { BootScene } from '../phaser/BootScene';
import { useUiStore } from '../store/uiStore';
import { ContributionSheet } from './ContributionSheet';
import { GameLayout } from './GameLayout';
import { HeaderOverlay } from './HeaderOverlay';
import { ObjectOverlay } from './ObjectOverlay';
import { PhaserHost } from './PhaserHost';
import { StoryPanel } from './StoryPanel';

export function GameScreen() {
  const roundId = useUiStore((s) => s.round?.id ?? '');
  const [sheetOpen, setSheetOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <GameLayout
      header={
        <HeaderOverlay
          onSuggest={() => setSheetOpen(true)}
          suggestRef={triggerRef}
        />
      }
      scene={
        <>
          <div className="absolute inset-0">
            <PhaserHost scenes={[BootScene]} />
          </div>
          <ObjectOverlay />
          <ContributionSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            roundId={roundId}
            returnFocusRef={triggerRef}
          />
        </>
      }
      story={<StoryPanel />}
    />
  );
}
