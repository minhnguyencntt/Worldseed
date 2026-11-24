import type { ReactNode } from 'react';
import { Frame } from './ui/Frame';

export function GameLayout({
  header,
  scene,
  story,
}: {
  header?: ReactNode;
  scene: ReactNode;
  story: ReactNode;
}) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-sf-ink-1"><main className="absolute inset-0">{header}{scene}</main><div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-4"><Frame kind="panel" className="sf-dialog pointer-events-auto" data-testid="story-dialog">{story}</Frame></div></div>
  );
}
