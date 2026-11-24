import { useEffect, useRef, useState } from 'react';
import { ContributionSheet } from './components/ContributionSheet';
import { GameLayout } from './components/GameLayout';
import { HeaderOverlay } from './components/HeaderOverlay';
import { IntroScreen } from './components/IntroScreen';
import { ObjectOverlay } from './components/ObjectOverlay';
import { PhaserHost } from './components/PhaserHost';
import { StoryPanel } from './components/StoryPanel';
import { BootScene } from './phaser/BootScene';
import { useUiStore } from './store/uiStore';
import { useGame } from './runtime/useGame';

export { describeRoundError } from './lib/roundError';

export default function App() {
  // Mounts the game store (hydrates the saved state); the overlay reads what it needs from the stores.
  useGame();
  const roundId = useUiStore((s) => s.round?.id ?? '');
  const [begun, setBegun] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    void useUiStore.getState().loadRound();
  }, []);

  if (!begun) {
    return <IntroScreen onBegin={() => setBegun(true)} />;
  }

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
