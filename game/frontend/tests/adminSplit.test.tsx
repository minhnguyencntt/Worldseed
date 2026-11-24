// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as client from '../src/api/client';
import { ApiError } from '../src/api/client';
import { AdminApp } from '../src/components/AdminApp';
import { AdminControls } from '../src/components/admin/AdminControls';
import { useAdminRound } from '../src/components/admin/useAdminRound';
import { adminContributionFixture, roundFixture, worldFixture } from './fixtures/api';

// The API client is mocked as a whole: every network call goes through these vi.fn stubs.
vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    getCurrentRound: vi.fn(),
    getWorld: vi.fn(),
    getAdminRound: vi.fn(),
    listRoundContributions: vi.fn(),
    createRound: vi.fn(),
    openRound: vi.fn(),
    closeRound: vi.fn(),
  };
});

const api = vi.mocked(client);

function enterToken(value: string) {
  const input = screen.getByLabelText('Admin token');
  fireEvent.change(input, { target: { value } });
  fireEvent.submit(input.closest('form')!);
}

describe('AdminControls', () => {
  afterEach(() => {
    cleanup();
  });

  it('Given the controls, when the duration is changed to 12, then onDurationChange is called with 12', () => {
    const onDurationChange = vi.fn();
    render(
      <AdminControls
        durationHours={24}
        onDurationChange={onDurationChange}
        onCreate={vi.fn()}
        onOpen={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText('Duration (hours)'), { target: { value: '12' } });

    expect(onDurationChange).toHaveBeenCalledWith(12);
  });

  it('Given the controls, when Create, Open and Close round are each clicked, then each handler is called once', () => {
    const onCreate = vi.fn();
    const onOpen = vi.fn();
    const onClose = vi.fn();
    render(
      <AdminControls
        durationHours={24}
        onDurationChange={vi.fn()}
        onCreate={onCreate}
        onOpen={onOpen}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create round' }));
    fireEvent.click(screen.getByRole('button', { name: 'Open round' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close round' }));

    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Given the controls, when rendered, then the max contributions input is disabled', () => {
    render(
      <AdminControls
        durationHours={24}
        onDurationChange={vi.fn()}
        onCreate={vi.fn()}
        onOpen={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Max contributions per player')).toBeDisabled();
  });
});

describe('useAdminRound', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.getCurrentRound.mockResolvedValue(roundFixture);
    api.getWorld.mockResolvedValue(worldFixture);
    api.getAdminRound.mockResolvedValue(roundFixture);
    api.listRoundContributions.mockResolvedValue([adminContributionFixture]);
    api.createRound.mockResolvedValue(roundFixture);
  });

  afterEach(() => {
    cleanup();
  });

  it('Given a token, when setToken is called, then the round and its contributions are loaded', async () => {
    const { result } = renderHook(() => useAdminRound());

    act(() => {
      result.current.setToken('t');
    });

    await waitFor(() => expect(result.current.round).toEqual(roundFixture));
    expect(result.current.contributions).toEqual([adminContributionFixture]);
    expect(api.getAdminRound).toHaveBeenCalledWith('t', roundFixture.id);
    expect(api.listRoundContributions).toHaveBeenCalledWith('t', roundFixture.id);
  });

  it('Given the admin round request is rejected with 401, when it loads, then the token is cleared and gateError is Invalid token', async () => {
    api.getAdminRound.mockRejectedValue(new ApiError(401, 'unauthorized'));
    const { result } = renderHook(() => useAdminRound());

    act(() => {
      result.current.setToken('t');
    });

    await waitFor(() => expect(result.current.gateError).toBe('Invalid token'));
    expect(result.current.token).toBe('');
  });

  it('Given a token, when handleCreateRound runs, then createRound is called with the token and 24 hours', async () => {
    const { result } = renderHook(() => useAdminRound());
    act(() => {
      result.current.setToken('t');
    });
    await waitFor(() => expect(result.current.round).toEqual(roundFixture));

    await act(async () => {
      await result.current.handleCreateRound();
    });

    expect(api.createRound).toHaveBeenCalledWith('t', 24);
  });
});

describe('AdminApp composed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.getCurrentRound.mockResolvedValue(roundFixture);
    api.getWorld.mockResolvedValue(worldFixture);
    api.getAdminRound.mockResolvedValue(roundFixture);
    api.listRoundContributions.mockResolvedValue([adminContributionFixture]);
  });

  afterEach(() => {
    cleanup();
  });

  it('Given the token gate, when a token is entered, then the heading shows the world title and the Contributions list shows the prompt', async () => {
    render(<AdminApp />);
    enterToken('secret');

    expect(
      await screen.findByRole('heading', { level: 1, name: `Admin · ${worldFixture.title}` }),
    ).toBeInTheDocument();
    const list = await screen.findByRole('list', { name: 'Contributions' });
    expect(list).toHaveTextContent(adminContributionFixture.prompt);
  });
});
