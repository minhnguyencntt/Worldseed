import { useEffect, useState } from 'react';

const CLOSED = 'Round closed';

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export function formatRemaining(ms: number): string {
  if (ms <= 0) {
    return CLOSED;
  }
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export interface CountdownProps {
  endsAt: string;
  now?: () => number;
}

export function Countdown({ endsAt, now = () => Date.now() }: CountdownProps) {
  const target = Date.parse(endsAt);
  const [remaining, setRemaining] = useState(() => target - now());

  useEffect(() => {
    setRemaining(target - now());
    const id = setInterval(() => {
      setRemaining(target - now());
    }, 1000);
    return () => clearInterval(id);
    // `now` is intentionally excluded: a default arrow is recreated every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return <time role="timer">{formatRemaining(remaining)}</time>;
}
