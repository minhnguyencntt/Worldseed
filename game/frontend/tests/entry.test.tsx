// @vitest-environment jsdom
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRoot } from 'react-dom/client';
import App from '../src/App';

// react-dom/client is mocked so the entry module can be exercised without
// mounting into a real DOM. @testing-library/react loads react-dom/client from
// node_modules (externalized), so the real render used in the last test is not
// affected by this mock.
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render: vi.fn() })),
}));

describe('entry point', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mocked(createRoot).mockClear();
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('Given index.html, then it declares the #root mount node and the main.tsx module script', () => {
    const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');

    expect(html).toContain('id="root"');
    expect(html).toContain('src="/src/main.tsx"');
    expect(existsSync(join(process.cwd(), 'src/main.tsx'))).toBe(true);
  });

  it('Given a #root element exists, when main is imported, then createRoot mounts on it and render is called once', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootEl = document.getElementById('root');

    await import('../src/main');

    expect(createRoot).toHaveBeenCalledWith(rootEl);
    const rootInstance = vi.mocked(createRoot).mock.results[0].value as { render: ReturnType<typeof vi.fn> };
    expect(rootInstance.render).toHaveBeenCalledOnce();
  });

  it('Given no #root element, when main is imported, then it throws a missing root error', async () => {
    document.body.innerHTML = '';

    await expect(import('../src/main')).rejects.toThrow('Root element #root not found');
  });

  it('Given the App component, when rendered, then the Begin button is shown', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'Begin' })).toBeInTheDocument();
  });
});
