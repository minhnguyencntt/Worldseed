import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type FrameKind = 'bar' | 'panel' | 'plaque' | 'parchment' | 'slot';

export interface FrameProps extends HTMLAttributes<HTMLElement> {
  kind: FrameKind;
  as?: ElementType;
}

export function Frame({ kind, as: Tag = 'div', className, ...props }: FrameProps) {
  return <Tag className={cn(`sf-frame-${kind}`, className)} data-frame={kind} {...props} />;
}
