import type { Round } from '../api/client';
import { Countdown } from './Countdown';

export interface HeaderOverlayProps {
  worldTitle: string;
  round?: Round;
  loading?: boolean;
  error?: string;
}

export function HeaderOverlay({ worldTitle, round, loading, error }: HeaderOverlayProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center gap-3 px-3 py-2">
      <span>StoryForge</span>
      <span>{worldTitle}</span>
      {error ? (
        <span role="alert">Round unavailable: {error}</span>
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
    </header>
  );
}
