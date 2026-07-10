import { SvgArrow } from "../svg/Svg";

export default function Button({
  children,
  loading = false,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading}
      className="w-full h-11 flex justify-center items-center gap-2 rounded-xl bg-[#4201c6] text-white font-medium hover:opacity-90 transition disabled:opacity-50"
    >
      {loading ? "Please Wait..." : children}
      <SvgArrow className="rotate-90"/>
    </button>
  );
}