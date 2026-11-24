import { useState } from 'react';

type AdminControlsProps = {
  durationHours: number;
  onDurationChange: (hours: number) => void;
  onCreate: () => void;
  onOpen: () => void;
  onClose: () => void;
};

export function AdminControls({
  durationHours,
  onDurationChange,
  onCreate,
  onOpen,
  onClose,
}: AdminControlsProps) {
  const [maxContributions, setMaxContributions] = useState(5);

  return (
    <>
      <label>
        Duration (hours)
        <input
          type="number"
          min={1}
          value={durationHours}
          onChange={(event) => onDurationChange(Number(event.target.value))}
        />
      </label>
      <label>
        Max contributions per player
        <input
          type="number"
          min={1}
          value={maxContributions}
          disabled
          onChange={(event) => setMaxContributions(Number(event.target.value))}
        />
      </label>
      <small>Set in server configuration (contribution.max_per_player); not editable here.</small>
      <div>
        <button type="button" onClick={onCreate}>
          Create round
        </button>
        <button type="button" onClick={onOpen}>
          Open round
        </button>
        <button type="button" onClick={onClose}>
          Close round
        </button>
      </div>
    </>
  );
}
