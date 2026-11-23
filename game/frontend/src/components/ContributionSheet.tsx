import { useEffect, useState, type FormEvent } from 'react';
import { ApiError, listMine, MAX_PER_PLAYER, submitContribution } from '../api/client';

export interface ContributionSheetProps {
  open: boolean;
  onClose: () => void;
  roundId: string;
}

type EntryState = 'sending' | 'sent' | 'failed';

interface Entry {
  key: number;
  prompt: string;
  state: EntryState;
}

const STATE_LABEL: Record<EntryState, string> = {
  sending: 'Sending…',
  sent: 'Sent',
  failed: 'Failed',
};

export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 429) return 'Slow down, try again shortly';
    if (err.status === 409) return 'Limit reached or duplicate idea';
  }
  return 'Could not send';
}

export function ContributionSheet({ open, onClose, roundId }: ContributionSheetProps) {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  // Load the player's existing suggestions for this round when the sheet opens.
  useEffect(() => {
    if (!open || roundId === '') return;
    let cancelled = false;
    listMine(roundId)
      .then((list) => {
        if (cancelled) return;
        setEntries(list.map((c, i) => ({ key: -(i + 1), prompt: c.prompt, state: 'sent' })));
      })
      .catch(() => {
        // History is best-effort; the sheet still works without it.
      });
    return () => {
      cancelled = true;
    };
  }, [open, roundId]);

  if (!open) {
    return null;
  }

  const remaining = MAX_PER_PLAYER - entries.filter((e) => e.state === 'sent').length;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = text.trim();
    if (prompt === '') return;

    const key = Date.now();
    setText('');
    setError(undefined);
    setEntries((prev) => [...prev, { key, prompt, state: 'sending' }]);

    try {
      await submitContribution(prompt);
      setEntries((prev) => prev.map((e) => (e.key === key ? { ...e, state: 'sent' } : e)));
    } catch (err) {
      setEntries((prev) => prev.map((e) => (e.key === key ? { ...e, state: 'failed' } : e)));
      setError(errorMessage(err));
    }
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="Suggest What Happens Next" className="contribution-sheet">
      <h2>Suggest What Happens Next</h2>
      <p>{`Contributions left: ${Math.max(remaining, 0)}`}</p>
      <p>Ideas are considered when the Round closes.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="contribution-idea">Your idea</label>
        <textarea
          id="contribution-idea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
        <button type="submit">Send</button>
      </form>

      {error && <p role="alert">{error}</p>}

      <ul aria-label="Your suggestions">
        {entries.map((entry) => (
          <li key={entry.key}>
            <span>{entry.prompt}</span> <span>{STATE_LABEL[entry.state]}</span>
          </li>
        ))}
      </ul>

      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
