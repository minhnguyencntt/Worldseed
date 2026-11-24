import type { ObjectSpec } from '@game/content/schema';
import type { SceneObjectView } from '@game/engine/scene';
import type { ActionDef } from '@game/state/types';
import { anchorFor } from '../lib/anchor';
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
  onAction: (objectId: string, actionId: ActionDef['id']) => void;
}

// Name plaque above the object's top edge and its action buttons below the bottom edge, both anchored to the canvas.
export function ObjectOverlay({ view, objectsSpec, layout, activeId, onAction }: ObjectOverlayProps) {
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

  return (
    <>
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
      >
        {object.actions.map((action) => (
          <Button key={action.id} variant="frame" onClick={() => onAction(object.id, action.id)}>
            {action.label.toUpperCase()}
          </Button>
        ))}
      </Frame>
    </>
  );
}
