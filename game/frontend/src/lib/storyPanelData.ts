import manifestJson from '../../../public/assets/worlds/the-boys-room/manifest.json';

export type InventorySlot = { id: string | null; name: string; icon: string | undefined };

export const INVENTORY_SLOT_COUNT = 6;

const manifestAssets: { id: string; path: string }[] = manifestJson.assets;

function iconFor(id: string): string | undefined {
  const entry = manifestAssets.find((asset) => asset.id === `item/${id}`);
  return entry ? `/assets/${entry.path}` : undefined;
}

export function portraitPath(speaker: string): string | undefined {
  const entry = manifestAssets.find((asset) => asset.id === `character:${speaker}-portrait`);
  return entry ? `/assets/${entry.path}` : undefined;
}

// 'old-key' -> 'Old Key'; splits on hyphens/underscores and capitalises each word.
export function humaniseId(id: string): string {
  return id
    .split(/[-_\s]+/)
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export function buildInventorySlots(inventory: string[]): InventorySlot[] {
  return Array.from({ length: INVENTORY_SLOT_COUNT }, (_, i): InventorySlot => {
    const id = inventory[i];
    if (id === undefined) {
      return { id: null, name: '', icon: undefined };
    }
    return { id, name: humaniseId(id), icon: iconFor(id) };
  });
}
