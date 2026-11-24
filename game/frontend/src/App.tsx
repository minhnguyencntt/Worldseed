import { useCallback, useEffect, useRef, useState } from 'react';
import { getActiveNode } from '@game/systems/dialogue';
import { ContributionSheet } from './components/ContributionSheet';
import { GameLayout } from './components/GameLayout';
import { HeaderOverlay } from './components/HeaderOverlay';
import { IntroScreen } from './components/IntroScreen';
import { ObjectOverlay, type OverlayLayout } from './components/ObjectOverlay';
import { PhaserHost } from './components/PhaserHost';
import { StoryPanel } from './components/StoryPanel';
import { BootScene } from './phaser/BootScene';
import { useGameStore } from './store/gameStore';
import { ApiError, getCurrentRound, type Round } from './api/client';
import { sceneSpec, world } from './runtime/content';
import { useGame } from './runtime/useGame';
import { phaserToReact, reactToPhaser } from './phaser/events';

export function describeRoundError(e: unknown): string {
  if (e instanceof ApiError) {
    return `Round service returned ${e.status}${e.detail ? `: ${e.detail}` : ''}`;
  }
  if (e instanceof TypeError) {
    return 'Could not reach the server';
  }
  if (e instanceof Error && e.message) {
    return e.message;
  }
  return 'Round request failed';
}

export default function App() {
  const game = useGame();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [layout, setLayout] = useState<OverlayLayout | undefined>(undefined);
  const focusedObjectId = useGameStore((s) => s.focusedObjectId);
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

  useEffect(() => phaserToReact.on('objectHover', ({ id }) => setHoverId(id)), []);

  useEffect(() => phaserToReact.on('menuClose', () => setSelectedId(undefined)), []);

  if (!begun) {
    return <IntroScreen onBegin={() => setBegun(true)} />;
  }

  // Hover previews the object under the pointer; keyboard focus and the last click keep its actions reachable.
  const activeId = hoverId ?? focusedObjectId ?? selectedId ?? null;
  const handleAction = (objectId: string, actionId: string) => {
    game.act(objectId, actionId);
    reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' });
  };
  return (
    <GameLayout
      header={
        <HeaderOverlay
          worldTitle={world.title}
          round={round}
          loading={loading}
          error={roundError}
          onRetry={loadRound}
          onSuggest={() => setSheetOpen(true)}
          suggestRef={triggerRef}
        />
      }
      scene={
        <>
          <div className="absolute inset-0">
            <PhaserHost scenes={[BootScene]} onLayout={setLayout} />
          </div>
          <ObjectOverlay
            view={game.view}
            objectsSpec={sceneSpec.objects}
            layout={layout}
            activeId={activeId}
            focusFirstAction={focusedObjectId !== null && activeId === focusedObjectId}
            onAction={handleAction}
          />
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
