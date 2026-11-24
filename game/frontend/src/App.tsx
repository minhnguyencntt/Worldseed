import { useCallback, useEffect, useRef, useState } from 'react';
import { getActiveNode } from '@game/systems/dialogue';
import { ActionMenu } from './components/ActionMenu';
import { ContributionSheet } from './components/ContributionSheet';
import { GameLayout } from './components/GameLayout';
import { HeaderOverlay } from './components/HeaderOverlay';
import { IntroScreen } from './components/IntroScreen';
import { PhaserHost } from './components/PhaserHost';
import { StoryPanel } from './components/StoryPanel';
import { BootScene } from './phaser/BootScene';
import { ApiError, getCurrentRound, type Round } from './api/client';
import { world } from './runtime/content';
import { useGame } from './runtime/useGame';
import { phaserToReact } from './phaser/events';

export function describeRoundError(e: unknown): string {
  if (e instanceof ApiError) {
    return `Round service returned ${e.status}${e.detail ? `: ${e.detail}` : ''}`;
  }
  if (e instanceof TypeError) {
    return 'Could not reach the server';
  }
  return 'Round request failed';
}

export default function App() {
  const game = useGame();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [begun, setBegun] = useState(false);
  const [round, setRound] = useState<Round | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [roundError, setRoundError] = useState<string | undefined>(undefined);
  const [sheetOpen, setSheetOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const loadRound = useCallback(() => {
    setLoading(true);
    setRoundError(undefined);
    return getCurrentRound()
      .then(setRound)
      .catch((e: unknown) => {
        if (e instanceof ApiError && e.status === 404) {
          setRound(undefined);
          return;
        }
        setRoundError(describeRoundError(e));
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void loadRound();
  }, [loadRound]);

  useEffect(() => phaserToReact.on('objectClick', ({ id }) => setSelectedId(id)), []);

  if (!begun) {
    return <IntroScreen onBegin={() => setBegun(true)} />;
  }

  const selected = game.view.find((o) => o.id === selectedId);
  return (
    <GameLayout
      header={<HeaderOverlay worldTitle={world.title} round={round} loading={loading} error={roundError} onRetry={loadRound} />}
      scene={
        <>
          <div className="absolute inset-0">
            <PhaserHost scenes={[BootScene]} />
          </div>
          <ActionMenu object={selected} onAction={game.act} />
          <button type="button" ref={triggerRef} onClick={() => setSheetOpen(true)}>
            Suggest What Happens Next
          </button>
          <ContributionSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            roundId={round?.id ?? ''}
            returnFocusRef={triggerRef}
          />
        </>
      }
      story={
        <StoryPanel
          sceneTitle={game.scene.title}
          node={getActiveNode(game.state, game.scene)}
          history={game.state.history}
          inventory={game.state.inventory}
          onChoose={game.choose}
        />
      }
    />
  );
}
