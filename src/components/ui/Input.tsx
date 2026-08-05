import React from 'react';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-[#24352C]">
          {label}
          {props.required && (
            <span className="text-red-500"> *</span>
          )}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          rounded-xl
          border
          bg-white
          border-gray-300
          px-4
          py-3
          text-base
          text-gray-900
          placeholder:text-gray-400
          transition-all
          duration-200
          outline-none
          focus:border-[#4F7A5A]
          focus:ring-4
          focus:ring-[#4F7A5A]/20
          disabled:bg-gray-100
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}