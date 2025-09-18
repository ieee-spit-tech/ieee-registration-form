"use client";

interface FormFieldProps {
  label: React.ReactNode;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
  options?: string[]; // for select dropdowns
  required?: boolean;
}

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  options,
  required,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-slate-200 mb-1">
        {label}
      </label>

      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          required={required}
        >
          <option value="">Select {label}</option>
          {options?.map((opt) => (
            <option key={opt} value={opt} className="bg-slate-800">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          required={required}
        />
      )}

      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
