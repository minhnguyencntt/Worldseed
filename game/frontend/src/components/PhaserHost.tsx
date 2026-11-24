import { useEffect, useRef } from 'react';
import type Phaser from 'phaser';
import { createGame } from '../phaser/createGame';
import { computeZoom } from '../phaser/config';
import { useUiStore } from '../store/uiStore';

export interface PhaserHostProps {
  scenes?: Phaser.Types.Scenes.SceneType[];
}

export function PhaserHost({ scenes }: PhaserHostProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const currentZoom = () =>
      computeZoom(container.clientWidth, container.clientHeight, window.devicePixelRatio);

    const reportLayout = () => {
      const r = container.getBoundingClientRect();
      useUiStore.getState().setCanvasLayout({ left: r.left, top: r.top, zoom: currentZoom(), dpr: window.devicePixelRatio });
    };

    if (gameRef.current === null) {
      gameRef.current = createGame(container, scenes ?? [], currentZoom());
    }
    reportLayout();

    const applyZoom = () => {
      const game = gameRef.current;
      if (!game) return;
      game.scale.setZoom(currentZoom());
      game.scale.refresh();
      reportLayout();
    };

    const observer = new ResizeObserver(applyZoom);
    observer.observe(container);

    // A resolution media query only fires for the dpr it was built with, so the
    // listener is re-armed against the new ratio after every change.
    const canWatchDpr = typeof window.matchMedia === 'function';
    let dprQuery: MediaQueryList | null = null;
    const watchDpr = () => {
      if (!canWatchDpr) return;
      dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      dprQuery.addEventListener('change', onDprChange);
    };
    const unwatchDpr = () => {
      dprQuery?.removeEventListener('change', onDprChange);
      dprQuery = null;
    };
    const onDprChange = () => {
      unwatchDpr();
      applyZoom();
      watchDpr();
    };
    watchDpr();

    return () => {
      observer.disconnect();
      unwatchDpr();
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
    // Mount-once: one game instance per host, destroyed on unmount.
  }, []);

  return <div ref={containerRef} className="h-full w-full" data-testid="phaser-host" />;
}
