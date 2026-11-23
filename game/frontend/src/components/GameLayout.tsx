import { useState, type ReactNode } from 'react';

export function GameLayout({ scene, story }: { scene: ReactNode; story: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="game-layout">
      <main className="scene-area">{scene}</main>
      <aside className={drawerOpen ? 'story-panel drawer-open' : 'story-panel'}>
        <button
          type="button"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          Story
        </button>
        {story}
      </aside>
    </div>
  );
}
