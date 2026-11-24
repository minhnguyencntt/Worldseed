import { useEffect, useRef } from 'react';
import type { ObjectSpec } from '@game/content/schema';
import type { SceneObjectView } from '@game/engine/scene';
import type { ActionDef } from '@game/state/types';
import { anchorFor } from '../lib/anchor';
import { handleMenuKey } from '../phaser/menuKeys';
import { Button } from './ui/button';
import { Frame } from './ui/Frame';

// Canvas placement reported by PhaserHost: container origin in viewport pixels, zoom and device pixel ratio.
export interface OverlayLayout {
  left: number;
  top: number;
  zoom: number;
  dpr: number;
}

export interface ObjectOverlayProps {
  view: SceneObjectView[];
  objectsSpec: ObjectSpec[];
  layout?: OverlayLayout;
  activeId?: string | null;
  // Moves DOM focus to the first action button, used when keyboard focus lands on an object.
  focusFirstAction?: boolean;
  onAction: (objectId: string, actionId: ActionDef['id']) => void;
}

// Name plaque above the object's top edge and its action buttons below the bottom edge, both anchored to the canvas.
export function ObjectOverlay({
  view,
  objectsSpec,
  layout,
  activeId,
  focusFirstAction = false,
  onAction,
}: ObjectOverlayProps) {
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focusFirstAction) firstButtonRef.current?.focus();
  }, [focusFirstAction, activeId]);

  if (!activeId || !layout) return null;

  const object = view.find((o) => o.id === activeId);
  const spec = objectsSpec.find((o) => o.id === activeId);
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
            onClick={() => onAction(object.id, action.id)}
          >
            {action.label.toUpperCase()}
          </Button>
        ))}
      </Frame>
    </>
  );
}
