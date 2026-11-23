import { useEffect, useRef } from 'react';
import type Phaser from 'phaser';
import { createGame } from '../phaser/createGame';

export interface PhaserHostProps {
  scenes?: Phaser.Types.Scenes.SceneType[];
}

export function PhaserHost({ scenes }: PhaserHostProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current === null && containerRef.current) {
      gameRef.current = createGame(containerRef.current, scenes ?? []);
    }

    const container = containerRef.current;
    const observer = new ResizeObserver(() => {
      gameRef.current?.scale.refresh();
    });
    if (container) observer.observe(container);

    return () => {
      observer.disconnect();
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
    // Mount-once: one game instance per host, destroyed on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="h-full w-full" data-testid="phaser-host" />;
}
