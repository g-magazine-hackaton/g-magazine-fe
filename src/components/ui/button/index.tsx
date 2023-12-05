import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  const defaultClassName =
    'cursor-pointer rounded-lg border border-transparent px-5 py-2 font-medium hover:border-primary focus:outline-1';
  const buttonClassName = [defaultClassName, className].join(' ');
  return (
    <button {...props} className={buttonClassName}>
      {children}
    </button>
  );
}
