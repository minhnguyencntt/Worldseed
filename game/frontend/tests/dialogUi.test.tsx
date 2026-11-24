// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../src/components/ui/dialog';

describe('Dialog wrapper', () => {
  afterEach(() => {
    cleanup();
  });

  function renderOpenDialog() {
    return render(
      <Dialog open>
        <DialogContent className="x-test">
          <DialogTitle>T</DialogTitle>
          <DialogDescription>D</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
  }

  it('renders an open dialog element with the dialog role', () => {
    // Given an open Dialog with content,
    // when it is rendered,
    // then a single element with the dialog role is present.
    renderOpenDialog();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('exposes the title as accessible name and the description as accessible description', () => {
    // Given an open Dialog whose title is "T" and description is "D",
    // when the dialog is queried by role,
    // then its accessible name is "T" and its accessible description is "D".
    renderOpenDialog();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('T');
    expect(dialog).toHaveAccessibleDescription('D');
  });

  it('applies the caller className to the dialog element', () => {
    // Given an open Dialog whose content passes className "x-test",
    // when the dialog is queried by role,
    // then the dialog element carries the "x-test" class.
    renderOpenDialog();
    expect(screen.getByRole('dialog')).toHaveClass('x-test');
  });
});
