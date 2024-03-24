import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';

const variantStyles = {
  primary: 'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary: 'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
};

type ButtonProps = {
  variant?: keyof typeof variantStyles;
  className?: string;
  children?: React.ReactNode;
} & (
  | ({ to: string; } & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'to'>)
  | React.ButtonHTMLAttributes<HTMLButtonElement>
);

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
  const isLink = 'to' in props;
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  );

  return isLink ? (
    <Link {...(props as React.ComponentPropsWithoutRef<typeof Link>)} className={className}>
      {children}
    </Link>
  ) : (
    <button {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={className}>
      {children}
    </button>
  );
};
