import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readSource = (relativePath: string): string => readFileSync(resolve(__dirname, '..', relativePath), 'utf8');

describe('bridge consumers', () => {
  it('types BootScene unsubscribe handles as Unsubscribe | null, not an inline (() => void) | null', () => {
    // Given the source of BootScene.ts
    const bootScene = readSource('src/phaser/BootScene.ts');

    // When it is scanned for the handle type declarations
    // Then the inline function type is absent and the named Unsubscribe type is used
    expect(bootScene).not.toContain('(() => void) | null');
    expect(bootScene).toContain('Unsubscribe | null');
  });

  it('does not create private buses in App, ObjectOverlay or BootScene; they use the shared buses', () => {
    // Given the consumers of the event bridge
    const consumers = [
      readSource('src/App.tsx'),
      readSource('src/components/ObjectOverlay.tsx'),
      readSource('src/phaser/BootScene.ts'),
    ];

    // When each source is scanned for createEventBus imports
    // Then none of them imports createEventBus
    for (const source of consumers) {
      expect(source).not.toMatch(/import\s*\{[^}]*\bcreateEventBus\b[^}]*\}/);
    }
  });
});
