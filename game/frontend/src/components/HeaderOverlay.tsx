import type { Ref } from 'react';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useUiStore } from '../store/uiStore';
import { world } from '../runtime/content';
import { Button } from './ui/button';
import { Frame } from './ui/Frame';
import { Countdown } from './Countdown';

export interface HeaderOverlayProps {
  onSuggest?: () => void;
  suggestRef?: Ref<HTMLButtonElement>;
}

export function HeaderOverlay({ onSuggest, suggestRef }: HeaderOverlayProps) {
  const soundEnabled = useUiStore((s) => s.soundEnabled);
  const toggleSound = useUiStore((s) => s.toggleSound);
  const toggleSettings = useUiStore((s) => s.toggleSettings);
  const round = useUiStore((s) => s.round);
  const loading = useUiStore((s) => s.roundLoading);
  const error = useUiStore((s) => s.roundError);
  const loadRound = useUiStore((s) => s.loadRound);

  return (
    <header data-testid="header-bar" className="sf-frame-bar sf-brass-corners absolute inset-x-0 top-0 z-10 flex items-center gap-3 px-3 py-2">
      <span className="sf-logo font-pixel">StoryForge</span>
      <Frame kind="plaque" as="span" className="px-3 py-1">{world.title}</Frame>
      {error ? (
        <>
          <span data-testid="round-pill" data-state="error" className="sf-pill">
            <span role="alert">Round unavailable: {error}</span>
          </span>
          <Button type="button" variant="frame" onClick={() => { void loadRound(); }}>Retry</Button>
        </>
      ) : loading ? (
        <span data-testid="round-pill" data-state="loading" className="sf-pill">Loading round…</span>
      ) : round ? (
        <>
          <span data-testid="round-pill" data-state="ready" className="sf-pill">
            <span data-testid="round-dot" data-status={round.status} className="sf-dot" aria-hidden="true" />
            <span>{round.id}</span>
            <span data-status={round.status}>{round.status}</span>
          </span>
          <Countdown endsAt={round.ends_at} />
        </>
      ) : (
        <span data-testid="round-pill" data-state="empty" className="sf-pill">No active round</span>
      )}
      <Button type="button" variant="gold" ref={suggestRef} aria-label="Suggest What Happens Next" onClick={onSuggest}>
        + SUGGEST WHAT HAPPENS NEXT
      </Button>
      <div role="group" aria-label="Header controls" className="ml-auto flex items-center gap-2">
        <Button type="button" variant="frame" aria-label="Toggle sound" aria-pressed={soundEnabled} onClick={toggleSound}>
          {soundEnabled ? <Volume2 aria-hidden="true" className="h-4 w-4" /> : <VolumeX aria-hidden="true" className="h-4 w-4" />}
        </Button>
        <Button type="button" variant="frame" aria-label="Settings" onClick={toggleSettings}>
          <Settings aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
