import { readFileSync } from 'node:fs';
import { fileURLToPath, URL as NodeURL } from 'node:url';
import { describe, expect, it } from 'vitest';

// The Node URL is aliased: the bare `URL` binding resolves to the jsdom
// global in this suite and yields an http:// URL that fileURLToPath rejects.
const readGitignoreLines = (): string[] =>
  readFileSync(fileURLToPath(new NodeURL('../../../.gitignore', import.meta.url)), 'utf8').split(/\r?\n/);

describe('repository .gitignore node_modules rule', () => {
  const lines = readGitignoreLines();

  it('contains the depth-independent node_modules/ rule', () => {
    // Given the repository-root .gitignore on disk,
    // when its lines are read,
    // then the bare node_modules/ rule is present so it matches at any depth.
    expect(lines).toContain('node_modules/');
  });

  it('does not contain the game-scoped game/node_modules/ rule', () => {
    // Given the repository-root .gitignore on disk,
    // when its lines are read,
    // then no game/node_modules/ rule remains that would only ignore one depth.
    expect(lines).not.toContain('game/node_modules/');
  });
});
