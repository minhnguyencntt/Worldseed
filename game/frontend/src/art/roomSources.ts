import type { ArtSource } from './sources';
import { BACKGROUND_SOURCES } from './roomBackground';
import { FURNITURE_SOURCES } from './roomFurniture';

// Every room art source: four background pieces followed by nine furniture pieces.
export const ROOM_SOURCES: ArtSource[] = [...BACKGROUND_SOURCES, ...FURNITURE_SOURCES];
