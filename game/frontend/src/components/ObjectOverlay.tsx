import { useEffect, useRef } from 'react';
import { getSceneView } from '@game/engine/scene';
import { anchorFor } from '../lib/anchor';
import { useActiveObject } from '../lib/useActiveObject';
import { handleMenuKey } from '../phaser/menuKeys';
import { scene, sceneSpec } from '../runtime/content';
import { performObjectAction } from '../runtime/objectActions';
import { useGameStore } from '../store/gameStore';
import { useUiStore } from '../store/uiStore';
import { Button } from './ui/button';
import { Frame } from './ui/Frame';

// Name plaque above the object's top edge and its action buttons below the bottom edge, both anchored to the canvas.
export function ObjectOverlay() {
  const layout = useUiStore((s) => s.canvasLayout);
  const state = useGameStore((s) => s.state);
  const { activeId, focusFirst } = useActiveObject();
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focusFirst) firstButtonRef.current?.focus();
  }, [focusFirst, activeId]);

  if (state === null || !activeId || !layout) return null;

  const view = getSceneView(state, scene);
  const object = view.find((o) => o.id === activeId);
  const spec = sceneSpec.objects.find((o) => o.id === activeId);
  if (!object || !spec) return null;

  const anchor = anchorFor({
    position: spec.position,
    bounds: spec.interactionBounds,
    scale: spec.scale,
    zoom: layout.zoom,
    offset: { left: layout.left, top: layout.top },
    dpr: layout.dpr,
  });
  if (!anchor) return null;

  const announcement = `${object.name}. Actions: ${object.actions.map((action) => action.label).join(', ')}`;

  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <Frame
        kind="plaque"
        className="pointer-events-none fixed z-20 -translate-x-1/2 -translate-y-full px-3 py-1 font-pixel text-sf-sm"
        style={{ left: anchor.top.x, top: anchor.top.y }}
      >
        {object.name.toUpperCase()}
      </Frame>
      <Frame
        kind="panel"
        className="fixed z-20 flex -translate-x-1/2 gap-2 p-2"
        style={{ left: anchor.bottom.x, top: anchor.bottom.y }}
        onKeyDown={(e) => { handleMenuKey(e.key); }}
      >
        {object.actions.map((action, index) => (
          <Button
            key={action.id}
            ref={index === 0 ? firstButtonRef : undefined}
            variant="frame"
            aria-label={`${action.label} ${object.name}`}
            onClick={() => performObjectAction(object.id, action.id)}
          >
            {action.label.toUpperCase()}
          </Button>
        ))}
      </Frame>
    </>
  );
}
