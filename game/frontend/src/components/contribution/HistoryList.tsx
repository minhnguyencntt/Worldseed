import type { Entry, HistoryStatus } from './messages';
import { HISTORY_EMPTY, HISTORY_ERROR, HISTORY_LOADING, STATE_LABEL } from './messages';

export interface HistoryListProps {
  historyStatus: HistoryStatus;
  entries: Entry[];
  onRetry: () => void;
}

export function HistoryList({ historyStatus, entries, onRetry }: HistoryListProps) {
  return (
    <>
      {historyStatus === 'loading' && <p role="status" data-testid="contribution-history-loading">{HISTORY_LOADING}</p>}
      {historyStatus === 'error' && <p role="alert" data-testid="contribution-history-error">{HISTORY_ERROR}</p>}
      {historyStatus === 'error' && (
        <button type="button" onClick={onRetry}>Retry</button>
      )}
      {historyStatus === 'ready' && entries.length === 0 && <p role="status" data-testid="contribution-history-empty">{HISTORY_EMPTY}</p>}

      <ul aria-label="Your suggestions">
        {entries.map((entry) => (
          <li key={entry.key}>
            <span>{entry.prompt}</span> <span>{STATE_LABEL[entry.state]}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
