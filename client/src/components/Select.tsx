import { SelectProps } from "../features/diagnostics/types/diagnostic";

export function Select<T extends string>({
  name,
  value,
  options,
  onChange,
  className,
  error,
}: SelectProps<T>) {
  return (
    <>
      <select
        name={name}
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        <option value="">Select {name}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
}
