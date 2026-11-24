import type { RefObject } from 'react';
import { MAX_PER_PLAYER, MAX_PROMPT_LENGTH } from '../api/client';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { HistoryList } from './contribution/HistoryList';
import { useContributionHistory } from './contribution/useContributionHistory';
import { useContributionSubmit } from './contribution/useContributionSubmit';

export { errorMessage } from './contribution/messages';
export type { HistoryStatus } from './contribution/messages';

export interface ContributionSheetProps {
  open: boolean;
  onClose: () => void;
  roundId: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function ContributionSheet({ open, onClose, roundId, returnFocusRef }: ContributionSheetProps) {
  const { entries, setEntries, historyStatus, retry } = useContributionHistory(open, roundId);
  const {
    text,
    error,
    validation,
    success,
    remaining,
    length,
    overLimit,
    submitting,
    handleSubmit,
    onTextChange,
  } = useContributionSubmit(entries, setEntries);

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent
        className="sf-frame-parchment fixed inset-x-0 bottom-0 top-auto translate-x-0 translate-y-0 z-10 max-h-[70vh] overflow-y-auto p-sf-4 text-sf-md"
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
            onChange={(e) => onTextChange(e.target.value)}
            rows={3}
            aria-invalid={validation !== undefined || overLimit}
            aria-describedby={
              validation
                ? 'contribution-idea-error'
                : ['contribution-idea-count', overLimit ? 'contribution-idea-limit' : undefined].filter(Boolean).join(' ')
            }
          />
          <p id="contribution-idea-count">{`${length} / ${MAX_PROMPT_LENGTH}`}</p>
          <button type="submit" disabled={remaining <= 0 || length === 0 || overLimit || submitting} aria-busy={submitting}>{submitting ? 'Sending…' : 'Send'}</button>
        </form>
        {validation && <p id="contribution-idea-error" role="alert">{validation}</p>}
        {overLimit && <p id="contribution-idea-limit" role="alert">{`Too long: ${length} / ${MAX_PROMPT_LENGTH}`}</p>}
        {remaining <= 0 && <p id="contribution-idea-quota" role="alert">You have used all your suggestions this round</p>}

        {error && <p role="alert">{error}</p>}
        {success && <p id="contribution-idea-success" role="status" data-testid="contribution-success">{success}</p>}
        <HistoryList historyStatus={historyStatus} entries={entries} onRetry={retry} />

        <button type="button" onClick={onClose}>
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
