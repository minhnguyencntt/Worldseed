import { getActiveNode } from '@game/systems/dialogue';
import { useGameStore } from '../store/gameStore';
import { buildInventorySlots } from '../lib/storyPanelData';
import { portraitPath } from '../lib/storyPanelData';
import { chooseOption } from '../runtime/chooseOption';
import { scene } from '../runtime/content';

export function StoryPanel() {
  const state = useGameStore((s) => s.state);
  if (state === null) return null;
  const node = getActiveNode(state, scene);
  const sceneTitle = scene.title;
  const history = state.history;
  const inventory = state.inventory;
  const onChoose = chooseOption;

  return (
    <div className="story-content sf-frame-panel flex flex-col gap-sf-3">
      <h1>{sceneTitle}</h1>
      {node && (
        <section className="dialogue sf-frame-parchment" aria-label="Dialogue">
          <div className="flex items-start gap-2">
            {portraitPath(node.speaker) && (
              <img
                src={portraitPath(node.speaker)}
                width={32}
                height={32}
                alt=""
                style={{ imageRendering: 'pixelated' }}
              />
            )}
            <div>
              <h2 className="font-pixel">{node.speaker}</h2>
              <p>{node.text}</p>
            </div>
          </div>
          <ul aria-label="Choices">
            {node.choices.map((choice, index) => (
              <li key={index}>
                <button className="sf-btn sf-btn-gold w-full text-left p-sf-2" type="button" onClick={() => onChoose(index)}>
                  {choice.text}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="sf-frame-plaque max-h-40 overflow-y-auto p-2" aria-label="Event log">
        <h2>Event log</h2>
        {history.length === 0 ? (
          <p>Nothing has happened yet</p>
        ) : (
          <ol aria-label="Story history">
            {history.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ol>
        )}
      </section>

      <section aria-label="Inventory">
        <h2>Inventory</h2>
        <ul className="grid grid-cols-3 gap-2">
          {buildInventorySlots(inventory).map((slot, i) => (
            <li key={i} className="sf-frame-slot" data-slot={i} data-empty={slot.id === null}>
              {slot.id !== null && (
                <>
                  {slot.icon && (
                    <img
                      src={slot.icon}
                      width={16}
                      height={16}
                      alt=""
                      style={{ imageRendering: 'pixelated' }}
                    />
                  )}
                  <span>{slot.name}</span>
                </>
              )}
            </li>
          ))}
        </ul>
        {inventory.length === 0 && <p>Empty</p>}
      </section>
    </div>
  );
}
