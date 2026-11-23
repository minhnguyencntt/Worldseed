import type { AdminContribution, Contribution, Round } from '../../src/api/client';

// Mirrors contributionJSON in backend/internal/contribution/handler.go:
// id, world_id, round_id, player_id, prompt, created_at (RFC 3339 time).
export const contributionFixture: Contribution = {
  id: 'contrib-1',
  world_id: 'the-boys-room',
  round_id: 'round-1',
  player_id: 'player-1',
  prompt: 'Look behind the shelf',
  created_at: '2026-11-23T10:00:00Z',
};

/** A round shaped like the backend world.Round JSON (id, number, status, starts_at, ends_at). */
export const roundFixture: Round = {
  id: 'round-1',
  number: 1,
  status: 'OPEN',
  starts_at: '2026-01-01T00:00:00.000Z',
  ends_at: '2026-01-01T00:01:30.000Z',
};

/** A contribution as the admin contributions endpoint returns it (contributionJSON in backend/internal/admin/rounds.go, which adds prompt_hash). */
export const adminContributionFixture: AdminContribution = {
  id: 'contrib-7',
  world_id: 'the-boys-room',
  round_id: 'round-1',
  player_id: 'player-1',
  prompt: 'Ask the cook what is in the soup',
  prompt_hash: 'sha256:3f2a9c1e7b6d4a58',
  created_at: '2026-01-01T00:00:30.000Z',
};

/** An execution shaped like the backend execution.Execution JSON (id, world_id, round_id, status, error, updated_at; backend/internal/execution/execution.go). */
export const executionFixture = {
  id: 'exec-1',
  world_id: 'the-boys-room',
  round_id: 'round-1',
  status: 'RUNNING',
  error: '',
  updated_at: '2026-01-01T00:00:45.000Z',
};
