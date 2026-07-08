export default function Input({
  label,
  error,
  ...props
}) {
  return (
    <div className="space-y-2">

      <label className="text-sm text-gray-300">
        {label}
      </label>

      <input
        {...props}
        className="w-full h-12 px-4 rounded-xl border border-gray-700 bg-zinc-900 outline-none focus:border-white"
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

    </div>
  );
}