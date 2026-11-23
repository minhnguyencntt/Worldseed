import type { DialogueNode } from '../../../src/state/types';

export interface StoryPanelProps {
  node: DialogueNode | undefined;
  history: string[];
  inventory: string[];
  onChoose: (index: number) => void;
}

export function StoryPanel({ node, history, inventory, onChoose }: StoryPanelProps) {
  return (
    <div className="story-panel">
      {node && (
        <section className="dialogue">
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

      <section>
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
