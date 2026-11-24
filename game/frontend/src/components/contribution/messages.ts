import { ApiError } from '../../api/client';

export type EntryState = 'sending' | 'sent' | 'failed';

export interface Entry {
  key: number;
  prompt: string;
  state: EntryState;
}

export type HistoryStatus = 'loading' | 'ready' | 'error';
export const HISTORY_LOADING = 'Loading your suggestions…';
export const HISTORY_ERROR = 'Could not load your suggestions';
export const HISTORY_EMPTY = 'No suggestions yet this round';

export const STATE_LABEL: Record<EntryState, string> = {
  sending: 'Sending…',
  sent: 'Sent',
  failed: 'Failed',
};

export const BLANK_MESSAGE = 'Enter an idea first';

export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 429) return 'Slow down, try again shortly';
    if (err.status === 409) return 'Limit reached or duplicate idea';
  }
  return 'Could not send';
}
