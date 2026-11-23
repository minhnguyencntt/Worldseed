// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
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

describe('App playing view', () => {
  afterEach(cleanup);

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  it('Given Begin clicked, then scene, hotspots, Story toggle and opening dialogue render', () => {
    begin();

    expect(screen.getByRole('img', { name: 'Bedroom' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bookshelf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Story' })).toBeInTheDocument();
    expect(
      screen.getByText("I don't know what to do next. What should we do?"),
    ).toBeInTheDocument();
  });

  it('Given the game view, when Bookshelf is clicked, then Inspect, Push, Search and Leave buttons appear', () => {
    begin();

    fireEvent.click(screen.getByRole('button', { name: 'Bookshelf' }));

    expect(screen.getByRole('button', { name: 'Inspect' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Push' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Leave' })).toBeInTheDocument();
  });

  it('Given Bookshelf menu, when Search is clicked, then history shows the hidden door text and the hotspot is open', () => {
    begin();

    fireEvent.click(screen.getByRole('button', { name: 'Bookshelf' }));
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByText('A hidden door swings open behind the books.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bookshelf' })).toHaveAttribute('data-open', 'true');
  });

  it('Given the opening dialogue, when Look around the room is clicked, then dialogue closes and history keeps the choice', () => {
    begin();

    fireEvent.click(screen.getByRole('button', { name: 'Look around the room' }));

    expect(screen.queryByRole('button', { name: 'Look around the room' })).toBeNull();
    expect(screen.getByRole('list', { name: 'Story history' })).toHaveTextContent(
      'Look around the room',
    );
  });
});

describe('App remount and saved state', () => {
  afterEach(cleanup);

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  it('Given a played game is unmounted, when the App remounts and Begin is clicked, then history, the opened hotspot and the Inventory region are restored', () => {
    const first = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
    fireEvent.click(screen.getByRole('button', { name: 'Bookshelf' }));
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByRole('button', { name: 'Bookshelf' })).toHaveAttribute('data-open', 'true');

    first.unmount();
    begin();

    expect(screen.getByRole('list', { name: 'Story history' })).toHaveTextContent(
      'A hidden door swings open behind the books.',
    );
    expect(screen.getByRole('button', { name: 'Bookshelf' })).toHaveAttribute('data-open', 'true');
    expect(screen.getByRole('region', { name: 'Inventory' })).toBeInTheDocument();
  });

  it('Given no saved state, when Begin is clicked, then the game starts fresh at the opening dialogue with the hotspot closed', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    begin();

    expect(screen.getByRole('region', { name: 'Dialogue' })).toHaveTextContent(
      "I don't know what to do next. What should we do?",
    );
    expect(screen.getByRole('button', { name: 'Bookshelf' })).toHaveAttribute('data-open', 'false');
  });
});
