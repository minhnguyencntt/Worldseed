import { useState } from 'react';
import { getActiveNode } from '@game/systems/dialogue';
import { ActionMenu } from './components/ActionMenu';
import { GameLayout } from './components/GameLayout';
import { IntroScreen } from './components/IntroScreen';
import { SceneView } from './components/SceneView';
import { StoryPanel } from './components/StoryPanel';
import { useGame } from './runtime/useGame';

export default function App() {
  const game = useGame();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [begun, setBegun] = useState(false);

  if (!begun) {
    return <IntroScreen onBegin={() => setBegun(true)} />;
  }

  const selected = game.view.find((o) => o.id === selectedId);
  return (
    <GameLayout
      scene={
        <>
          <SceneView
            sceneId={game.scene.id}
            title={game.scene.title}
            objects={game.view}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <ActionMenu object={selected} onAction={game.act} />
        </>
      }
      story={
        <StoryPanel
          node={getActiveNode(game.state, game.scene)}
          history={game.state.history}
          inventory={game.state.inventory}
          onChoose={game.choose}
        />
      }
    />
  );
}
