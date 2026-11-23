import type { SceneObjectView } from '../../../src/engine/scene';
import { ASSET_PATHS, HOTSPOTS } from '../runtime/assets';

export interface SceneViewProps {
  sceneId: string;
  title: string;
  objects: SceneObjectView[];
  selectedId: string | undefined;
  onSelect: (objectId: string) => void;
}

export function SceneView({ sceneId, title, objects, selectedId, onSelect }: SceneViewProps) {
  return (
    <div className="scene-view" data-selected={selectedId ?? ''}>
      <img src={ASSET_PATHS['scene:' + sceneId]} alt={title} className="scene-background" />
      {objects.map((obj) => (
        <button
          key={obj.id}
          type="button"
          className="hotspot"
          aria-label={obj.name}
          aria-pressed={selectedId === obj.id}
          style={{ position: 'absolute', ...HOTSPOTS[obj.id] }}
          data-open={String(obj.open)}
          onClick={() => onSelect(obj.id)}
        />
      ))}
    </div>
  );
}
