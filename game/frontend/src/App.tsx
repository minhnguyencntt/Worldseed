import { useEffect, useState } from 'react';
import { GameScreen } from './components/GameScreen';
import { IntroScreen } from './components/IntroScreen';
import { useUiStore } from './store/uiStore';
import { useGame } from './runtime/useGame';

export { describeRoundError } from './lib/roundError';

export default function App() {
  // Mounts the game store (hydrates the saved state); the overlay reads what it needs from the stores.
  useGame();
  const [begun, setBegun] = useState(false);

  useEffect(() => {
    void useUiStore.getState().loadRound();
  }, []);

  if (!begun) {
    return <IntroScreen onBegin={() => setBegun(true)} />;
  }

  return <GameScreen />;
}
