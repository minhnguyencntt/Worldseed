import type { DialogueNode } from '../../../src/state/types';

export interface StoryPanelProps {
  sceneTitle: string;
  node: DialogueNode | undefined;
  history: string[];
  inventory: string[];
  onChoose: (index: number) => void;
}

export function StoryPanel({ sceneTitle, node, history, inventory, onChoose }: StoryPanelProps) {
  return (
    <div className="story-content h-full overflow-y-auto p-3 font-mono text-sm border-l-4 border-amber-900 bg-stone-900 text-amber-100">
      <h1>{sceneTitle}</h1>
      {node && (
        <section className="dialogue" aria-label="Dialogue">
          <h2>{node.speaker}</h2>
          <p>{node.text}</p>
          <div className="choices">
            {node.choices.map((choice, index) => (
              <button key={index} type="button" onClick={() => onChoose(index)}>
                {choice.text}
              </button>
            ))}
          </div>
        </section>
      )}

      <ol aria-label="Story history">
        {history.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ol>

      <section aria-label="Inventory">
        <h2>Inventory</h2>
        {inventory.length === 0 ? (
          <p>Empty</p>
        ) : (
          <ul>
            {inventory.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
