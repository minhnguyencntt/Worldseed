import { useEffect, useState, type FormEvent, type RefObject } from 'react';
import { ApiError, listMine, MAX_PER_PLAYER, MAX_PROMPT_LENGTH, submitContribution } from '../api/client';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

export interface ContributionSheetProps {
  open: boolean;
  onClose: () => void;
  roundId: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
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

const BLANK_MESSAGE = 'Enter an idea first';

export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 429) return 'Slow down, try again shortly';
    if (err.status === 409) return 'Limit reached or duplicate idea';
  }
  return 'Could not send';
}

export function ContributionSheet({ open, onClose, roundId, returnFocusRef }: ContributionSheetProps) {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [validation, setValidation] = useState<string | undefined>(undefined);

  // Load the player's existing suggestions for this round when the sheet opens.
  useEffect(() => {
    if (!open || roundId === '') return;
    let cancelled = false;
    listMine(roundId)
      .then((list) => {
        if (cancelled) return;
        // Merge rather than overwrite: entries sent or still sending while the
        // history request was in flight must survive the response.
        setEntries((prev) => {
          const known = new Set(prev.map((e) => e.prompt));
          const history = list
            .filter((c) => !known.has(c.prompt))
            .map((c, i) => ({ key: -(i + 1), prompt: c.prompt, state: 'sent' as const }));
          return [...history, ...prev];
        });
      })
      .catch(() => {
        // History is best-effort; the sheet still works without it.
      });
    return () => {
      cancelled = true;
    };
  }, [open, roundId]);

  const remaining = MAX_PER_PLAYER - entries.filter((e) => e.state === 'sent').length;
  const length = Array.from(text.trim()).length;
  const overLimit = length > MAX_PROMPT_LENGTH;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (remaining <= 0) return;
    const prompt = text.trim();
    if (prompt === '') {
      setValidation(BLANK_MESSAGE);
      return;
    }
    if (overLimit) return;

    const key = Date.now();
    setText('');
    setError(undefined);
    setValidation(undefined);
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
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent
        className="contribution-sheet"
        onCloseAutoFocus={(event) => {
          if (returnFocusRef?.current) {
            event.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
      >
        <DialogTitle>Suggest What Happens Next</DialogTitle>
        <p>{`Contributions left: ${Math.max(remaining, 0)}`}</p>
        <DialogDescription>Ideas are considered when the Round closes.</DialogDescription>

        <form onSubmit={handleSubmit}>
          <label htmlFor="contribution-idea">Your idea</label>
          <textarea
            id="contribution-idea"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setValidation(undefined);
            }}
            rows={3}
            aria-invalid={validation !== undefined || overLimit}
            aria-describedby={
              validation
                ? 'contribution-idea-error'
                : ['contribution-idea-count', overLimit ? 'contribution-idea-limit' : undefined].filter(Boolean).join(' ')
            }
          />
          <p id="contribution-idea-count">{`${length} / ${MAX_PROMPT_LENGTH}`}</p>
          <button type="submit" disabled={remaining <= 0}>Send</button>
        </form>
        {validation && <p id="contribution-idea-error" role="alert">{validation}</p>}
        {overLimit && <p id="contribution-idea-limit" role="alert">{`Too long: ${length} / ${MAX_PROMPT_LENGTH}`}</p>}
        {remaining <= 0 && <p id="contribution-idea-quota" role="alert">You have used all your suggestions this round</p>}

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
      </DialogContent>
    </Dialog>
  );
}
