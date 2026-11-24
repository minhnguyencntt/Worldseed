import type { ReactNode } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useUiStore } from '../store/uiStore';
import { Button } from './ui/button';

export function GameLayout({
  header,
  scene,
  story,
}: {
  header?: ReactNode;
  scene: ReactNode;
  story: ReactNode;
}) {
  const drawerOpen = useUiStore((s) => s.drawerOpen);
  const toggleDrawer = useUiStore((s) => s.toggleDrawer);

  return (
    <div className="grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-[4fr_1fr]">
      <main className="relative min-w-0 overflow-hidden pb-12 md:pb-0">{header}{scene}</main>
      <motion.aside
        data-state={drawerOpen ? 'open' : 'closed'}
        className="sf-frame-panel overflow-y-auto transition-transform duration-300 ease-out max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:max-h-[50vh] max-md:translate-y-[calc(100%-3rem)] data-[state=open]:max-md:translate-y-0 md:h-screen"
      >
        <Button type="button" variant="frame" aria-expanded={drawerOpen} onClick={toggleDrawer}>
          <ChevronUp aria-hidden="true" className="h-4 w-4" />
          Story
        </Button>
        {story}
      </motion.aside>
    </div>
  );
}
