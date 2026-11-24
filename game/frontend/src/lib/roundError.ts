import { ApiError } from '../api/client';

export function describeRoundError(e: unknown): string {
  if (e instanceof ApiError) {
    return `Round service returned ${e.status}${e.detail ? `: ${e.detail}` : ''}`;
  }
  if (e instanceof TypeError) {
    return 'Could not reach the server';
  }
  if (e instanceof SyntaxError) {
    return 'Round service returned an unexpected response (not JSON)';
  }
  if (e instanceof Error && e.message) {
    return e.message;
  }
  return 'Round request failed';
}
