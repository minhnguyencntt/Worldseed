import { useEffect, useRef, useState } from 'react';
import { ContributionSheet } from './components/ContributionSheet';
import { GameLayout } from './components/GameLayout';
import { HeaderOverlay } from './components/HeaderOverlay';
import { IntroScreen } from './components/IntroScreen';
import { ObjectOverlay } from './components/ObjectOverlay';
import { PhaserHost } from './components/PhaserHost';
import { StoryPanel } from './components/StoryPanel';
import { BootScene } from './phaser/BootScene';
import { useGameStore } from './store/gameStore';
import { useUiStore } from './store/uiStore';
import { sceneSpec } from './runtime/content';
import { useGame } from './runtime/useGame';
import { phaserToReact, reactToPhaser } from './phaser/events';

export { describeRoundError } from './lib/roundError';

export default function App() {
  const game = useGame();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const layout = useUiStore((s) => s.canvasLayout);
  const focusedObjectId = useGameStore((s) => s.focusedObjectId);
  const roundId = useUiStore((s) => s.round?.id ?? '');
  const [begun, setBegun] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    void useUiStore.getState().loadRound();
  }, []);

  useEffect(() => phaserToReact.on('objectClick', ({ id }) => setSelectedId(id)), []);

  useEffect(() => phaserToReact.on('objectHover', ({ id }) => setHoverId(id)), []);

  useEffect(() => phaserToReact.on('menuClose', () => setSelectedId(undefined)), []);

  const handleAction = (objectId: string, actionId: string) => {
    const events = game.act(objectId, actionId);
    reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' });
    const go = events.find((e) => e.type === 'goto_scene');
    if (go && go.type === 'goto_scene') reactToPhaser.emit('transitionTo', { sceneId: go.scene });
  };

  if (!begun) {
    return <IntroScreen onBegin={() => setBegun(true)} />;
  }

  // Hover previews the object under the pointer; keyboard focus and the last click keep its actions reachable.
  const activeId = hoverId ?? focusedObjectId ?? selectedId ?? null;
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
            roundId={roundId}
            returnFocusRef={triggerRef}
          />
        </>
      }
      story={<StoryPanel />}
    />
  );
}
