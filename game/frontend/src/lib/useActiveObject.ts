import { useEffect, useState } from 'react';
import { phaserToReact } from '../phaser/events';
import { useGameStore } from '../store/gameStore';

export interface ActiveObject {
  activeId: string | null;
  // True when keyboard focus landed on the object, so its first action button should take focus.
  focusFirst: boolean;
}

// Hover previews the object under the pointer; keyboard focus and the last click keep its actions reachable.
export function useActiveObject(): ActiveObject {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const focusedObjectId = useGameStore((s) => s.focusedObjectId);

  useEffect(() => {
    const offHover = phaserToReact.on('objectHover', ({ id }) => setHoverId(id));
    const offClick = phaserToReact.on('objectClick', ({ id }) => setSelectedId(id));
    const offClose = phaserToReact.on('menuClose', () => setSelectedId(null));
    return () => {
      offHover();
      offClick();
      offClose();
    };
  }, []);

  const activeId = hoverId ?? focusedObjectId ?? selectedId ?? null;
  const focusFirst = focusedObjectId !== null && activeId === focusedObjectId;
  return { activeId, focusFirst };
}
