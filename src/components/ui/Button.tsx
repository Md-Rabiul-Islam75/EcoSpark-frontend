import React from 'react';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex w-full items-center justify-center rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary:
      'bg-[#16281F] text-white hover:bg-[#1F3529] hover:shadow-lg',

    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300',

    outline:
      'border border-[#16281F] text-[#16281F] hover:bg-[#16281F] hover:text-white',

    danger:
      'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    sm: 'h-10 px-4 text-sm',

    md: 'h-12 px-5 text-base',

    lg: 'h-14 px-6 text-lg',
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}