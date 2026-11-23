import { useState, type ReactNode } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export function GameLayout({ scene, story }: { scene: ReactNode; story: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-[4fr_1fr]">
      <main className="relative min-w-0 overflow-hidden">{scene}</main>
      <motion.aside
        className={
          drawerOpen
            ? 'story-panel drawer-open overflow-y-auto md:h-screen'
            : 'story-panel overflow-y-auto md:h-screen'
        }
      >
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
