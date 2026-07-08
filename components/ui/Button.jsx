export default function Button({
  children,
  loading = false,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading}
      className="w-full h-12 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
    >
      {loading ? "Please Wait..." : children}
    </button>
  );
}