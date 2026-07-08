export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black flex items-center justify-center px-5">

      <div className="w-full max-w-md">
        {children}
      </div>

    </main>
  );
}