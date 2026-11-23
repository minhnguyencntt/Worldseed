import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

// Each test starts with empty storage and no leftover spies so persistence
// tests cannot leak saved state or fake storage failures into each other.
afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});
