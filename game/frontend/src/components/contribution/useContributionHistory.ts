import { useEffect, useState } from 'react';
import { listMine } from '../../api/client';
import type { Entry, HistoryStatus } from './messages';

export function useContributionHistory(open: boolean, roundId: string) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [reloadKey, setReloadKey] = useState(0);
  const [historyStatus, setHistoryStatus] = useState<HistoryStatus>('loading');

  // Load the player's existing suggestions for this round when the sheet opens.
  useEffect(() => {
    if (!open || roundId === '') return;
    let cancelled = false;
    setHistoryStatus('loading');
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
        setHistoryStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        // History is best-effort; the sheet still works without it.
        setHistoryStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [open, roundId, reloadKey]);

  return {
    entries,
    setEntries,
    historyStatus,
    retry: () => setReloadKey((k) => k + 1),
  };
}
