import { phaserToReact } from './events';

export function handleMenuKey(key: string): boolean {
  if (key !== 'Escape') return false;
  phaserToReact.emit('menuClose', {});
  return true;
}
