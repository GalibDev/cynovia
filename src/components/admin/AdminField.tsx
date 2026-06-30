type AdminFieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
};

export function AdminField({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  type = "text",
  textarea,
}: AdminFieldProps) {
  const className =
    "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <label className="block text-sm font-bold text-slate-700">
      {label}
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          required={required}
          className={`${className} min-h-24 resize-y`}
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          required={required}
          className={className}
        />
      )}
    </label>
  );
}
