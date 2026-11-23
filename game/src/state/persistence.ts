// Game state persistence: serialization and validation over GameState.
// Repository baseline: AI-DLC scan v1, tip 9cda5131c65b08541fc685d8a0898d39a0e9e9fa.

export interface GameState {
  currentScene: string;
  inventory: unknown[];
  discoveredObjects: unknown[];
  completedQuests: unknown[];
  history: unknown[];
  flags: Record<string, unknown>;
  relationships: Record<string, unknown>;
  activeDialogue: string | null;
}

export function serializeState(state: GameState): string {
  return JSON.stringify(state);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function deserializeState(json: string): GameState {
  const parsed: unknown = JSON.parse(json);

  if (!isPlainObject(parsed)) {
    throw new Error('Invalid game state: root');
  }

  if (typeof parsed.currentScene !== 'string') {
    throw new Error('Invalid game state: currentScene');
  }

  for (const field of ['inventory', 'discoveredObjects', 'completedQuests', 'history'] as const) {
    if (!Array.isArray(parsed[field])) {
      throw new Error(`Invalid game state: ${field}`);
    }
    if (!(parsed[field] as unknown[]).every((v) => typeof v === 'string')) {
      throw new Error(`Invalid game state: ${field}`);
    }
  }

  for (const field of ['flags', 'relationships'] as const) {
    if (!isPlainObject(parsed[field])) {
      throw new Error(`Invalid game state: ${field}`);
    }
  }

  if (!Object.values(parsed.flags as Record<string, unknown>).every((v) => typeof v === 'boolean')) {
    throw new Error('Invalid game state: flags');
  }

  if (!Object.values(parsed.relationships as Record<string, unknown>).every((v) => typeof v === 'number')) {
    throw new Error('Invalid game state: relationships');
  }

  if (parsed.activeDialogue !== null && typeof parsed.activeDialogue !== 'string') {
    throw new Error('Invalid game state: activeDialogue');
  }

  return parsed as unknown as GameState;
}
