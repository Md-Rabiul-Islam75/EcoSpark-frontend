interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-600"> *</span>}
        </label>
      )}
      <input
        className={`px-4 py-2 border rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <span className="mt-1 text-sm text-red-600">{error}</span>}
    </div>
  );
}
