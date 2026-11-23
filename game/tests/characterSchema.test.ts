import { describe, it, expect } from 'vitest';
import { characterSchema } from '../src/content/schema';

// Base character fixture without any interaction block; pure in-memory input, no I/O.
function baseCharacter(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: 'boy',
    name: 'Boy',
    position: { x: 1, y: 2 },
    animations: { idle: { asset: 'character:boy', animation: 'idle' } },
    ...overrides,
  };
}

describe('characterSchema interaction', () => {
  it('leaves interaction undefined when the character declares none', () => {
    // Given a character without an interaction block
    const input = baseCharacter();
    // When the character is parsed
    const result = characterSchema.parse(input);
    // Then the optional interaction stays undefined
    expect(result.interaction).toBeUndefined();
  });

  it('keeps the dialogue key when interaction declares a dialogue id', () => {
    // Given a character whose interaction names a dialogue entry
    const input = baseCharacter({ interaction: { dialogue: 'npc-greeting' } });
    // When the character is parsed
    const result = characterSchema.parse(input);
    // Then the interaction dialogue id is preserved
    expect(result.interaction?.dialogue).toBe('npc-greeting');
  });

  it('keeps the actions list when interaction declares an action', () => {
    // Given a character whose interaction offers an inspect action
    const input = baseCharacter({
      interaction: { actions: [{ id: 'inspect', label: 'Talk', events: [] }] },
    });
    // When the character is parsed
    const result = characterSchema.parse(input);
    // Then exactly one action is kept with id 'inspect'
    expect(result.interaction?.actions).toHaveLength(1);
    expect(result.interaction?.actions?.[0].id).toBe('inspect');
  });
});

describe('characterSchema rejects invalid interaction', () => {
  it('throws when interaction dialogue is not a string', () => {
    // Given a character whose interaction dialogue is the number 5
    const input = baseCharacter({ interaction: { dialogue: 5 } });
    // When the character is parsed
    // Then parsing throws
    expect(() => characterSchema.parse(input)).toThrow();
  });

  it('throws when an interaction action uses an unknown action id', () => {
    // Given a character whose interaction action id 'dance' is not a known action
    const input = baseCharacter({
      interaction: { actions: [{ id: 'dance', label: 'x', events: [] }] },
    });
    // When the character is parsed
    // Then parsing throws
    expect(() => characterSchema.parse(input)).toThrow();
  });
});
