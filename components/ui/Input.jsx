export default function Input({
  label,
  error,
  ...props
}) {
  return (
    <div className="space-y-2">

      <label className="text-sm text-[#484457]">
        {label}
      </label>

      <input
        {...props}
        className="w-full h-10 px-4 rounded-lg border-2 border-[#c9c3da] outline-none focus:border-[#4201c6]"
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

    </div>
  );
}