import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'default' | 'ghost' | 'frame' | 'gold';
export type ButtonState = 'normal' | 'hover' | 'pressed' | 'disabled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  asChild?: boolean;
  state?: ButtonState;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: 'inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground',
  ghost: 'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent',
  frame: 'sf-btn inline-flex items-center gap-2 font-pixel text-sf-sm',
  gold: 'sf-btn sf-btn-gold inline-flex items-center gap-2 font-pixel text-sf-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'default', asChild = false, className, type = 'button', state, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'button';
  const frameProps =
    variant === 'frame' || variant === 'gold'
      ?{ 'data-state': state, disabled: props.disabled || state === 'disabled' }
      : {};
  return (
    <Comp
      ref={ref}
      {...(asChild ? {} : { type })}
      className={cn(variantClasses[variant], className)}
      {...props}
      {...frameProps}
    />
  );
});
