import { Volume2, VolumeX, Settings } from 'lucide-react';
import type { Round } from '../api/client';
import { useUiStore } from '../store/uiStore';
import { Button } from './ui/button';
import { Countdown } from './Countdown';

export interface HeaderOverlayProps {
  worldTitle: string;
  round?: Round;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export function HeaderOverlay({ worldTitle, round, loading, error, onRetry }: HeaderOverlayProps) {
  const soundEnabled = useUiStore((s) => s.soundEnabled);
  const toggleSound = useUiStore((s) => s.toggleSound);
  const toggleSettings = useUiStore((s) => s.toggleSettings);

  return (
    <header className="sf-frame-bar absolute inset-x-0 top-0 z-10 flex items-center gap-3 px-3 py-2">
      <span>StoryForge</span>
      <span>{worldTitle}</span>
      {error ? (
        <>
          <span role="alert">Round unavailable: {error}</span>
          {onRetry && <Button type="button" variant="frame" onClick={onRetry}>Retry</Button>}
        </>
      ) : loading ? (
        <span>Loading round…</span>
      ) : round ? (
        <>
          <span>{round.id}</span>
          <span data-status={round.status}>{round.status}</span>
          <Countdown endsAt={round.ends_at} />
        </>
      ) : (
        <span>No active round</span>
      )}
      <Button type="button" variant="frame" aria-label="Toggle sound" aria-pressed={soundEnabled} onClick={toggleSound}>
        {soundEnabled ? <Volume2 aria-hidden="true" className="h-4 w-4" /> : <VolumeX aria-hidden="true" className="h-4 w-4" />}
      </Button>
      <Button type="button" variant="frame" aria-label="Settings" onClick={toggleSettings}>
        <Settings aria-hidden="true" className="h-4 w-4" />
      </Button>
    </header>
  );
}
