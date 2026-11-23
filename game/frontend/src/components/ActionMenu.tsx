import type { SceneObjectView } from '../../../src/engine/scene';
import type { ActionDef } from '../../../src/state/types';

export interface ActionMenuProps {
  object: SceneObjectView | undefined;
  onAction: (objectId: string, actionId: ActionDef['id']) => void;
}

export function ActionMenu({ object, onAction }: ActionMenuProps) {
  if (object === undefined) {
    return null;
  }

  return (
    <section className="action-menu" aria-label={object.name}>
      <h2>{object.name}</h2>
      <p>{object.description}</p>
      <div className="actions">
        {object.actions.map((action) => (
          <button key={action.id} type="button" onClick={() => onAction(object.id, action.id)}>
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}
