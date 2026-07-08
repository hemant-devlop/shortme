export default function Card({ children }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
      {children}
    </div>
  );
}