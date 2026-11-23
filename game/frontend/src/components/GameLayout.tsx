import { useState, type ReactNode } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export function GameLayout({ scene, story }: { scene: ReactNode; story: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="game-layout">
      <main className="scene-area">{scene}</main>
      <motion.aside className={drawerOpen ? 'story-panel drawer-open' : 'story-panel'}>
        <Button
          type="button"
          variant="ghost"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          <ChevronUp aria-hidden="true" className="h-4 w-4" />
          Story
        </Button>
        {story}
      </motion.aside>
    </div>
  );
}
