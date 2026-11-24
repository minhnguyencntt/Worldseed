// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { cn } from '../src/lib/utils';
import { Button } from '../src/components/ui/button';

describe('cn', () => {
  afterEach(() => {
    cleanup();
  });

  it('keeps the last conflicting Tailwind utility when classes merge', () => {
    // Given two conflicting padding utilities,
    // when cn merges them,
    // then only the later padding utility remains.
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('drops falsy class values and keeps the truthy ones in order', () => {
    // Given a mix of truthy strings and a false conditional,
    // when cn merges them,
    // then the false value is dropped and the rest keep their order.
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });
});

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a button with the primary background class by default', () => {
    // Given a default Button with the label Go,
    // when it is rendered,
    // then the button role named Go has the bg-primary class.
    render(<Button>Go</Button>);

    expect(screen.getByRole('button', { name: 'Go' })).toHaveClass('bg-primary');
  });

  it('renders its child link as the inline-flex element without a button role when asChild is set', () => {
    // Given a Button with asChild wrapping an anchor to /x,
    // when it is rendered,
    // then the link carries the inline-flex class and no button role exists.
    render(
      <Button asChild>
        <a href="/x">Link</a>
      </Button>,
    );

    expect(screen.getByRole('link')).toHaveClass('inline-flex');
    expect(screen.queryByRole('button')).toBeNull();
  });
});
