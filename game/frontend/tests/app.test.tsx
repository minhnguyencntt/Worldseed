// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '../src/App';

// The real App is rendered with its real components. localStorage is jsdom's
// and is cleared between tests by tests/setup.ts.
describe('App intro gate', () => {
  afterEach(cleanup);

  it('Given a fresh render, then the intro and Begin button show and no hotspot exists', () => {
    render(<App />);

    expect(screen.getByText('What should I do?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Begin' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Bed' })).toBeNull();
  });

  it('Given Begin is clicked, then the intro is removed', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(screen.queryByText('What should I do?')).toBeNull();
  });
});
