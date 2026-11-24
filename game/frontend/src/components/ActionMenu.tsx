import { useEffect, useRef } from 'react';
import type { SceneObjectView } from '../../../src/engine/scene';
import type { ActionDef } from '../../../src/state/types';
import { phaserToReact } from '../phaser/events';

export interface ActionMenuProps {
  object: SceneObjectView | undefined;
  onAction: (objectId: string, actionId: ActionDef['id']) => void;
  focusFirstAction?: boolean;
}

export function ActionMenu({ object, onAction, focusFirstAction = false }: ActionMenuProps) {
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const objectId = object?.id;

  useEffect(() => {
    if (focusFirstAction) {
      firstButtonRef.current?.focus();
    }
  }, [focusFirstAction, objectId]);

  const announcement =
    object === undefined
      ? ''
      : `${object.name}. Actions: ${object.actions.map((action) => action.label).join(', ')}`;

  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
      {object !== undefined && (
        <section className="action-menu" aria-label={object.name} data-object-id={object.id}>
          <h2>{object.name}</h2>
          <p>{object.description}</p>
          <div
            className="actions"
            role="group"
            aria-label={object.name}
            onKeyDown={(e) => {
              if (e.key === 'Escape') phaserToReact.emit('menuClose', {});
            }}
          >
            {object.actions.map((action, index) => (
              <button
                key={action.id}
                ref={index === 0 ? firstButtonRef : undefined}
                type="button"
                aria-label={`${action.label} ${object.name}`}
                onClick={() => onAction(object.id, action.id)}
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
