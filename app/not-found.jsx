'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => setCount(c => c - 1), 1000);
    const timeout = setTimeout(() => router.replace('/'), 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-2">404 — Page Not Found</h1>
      <p className="mb-4">
        Redirecting to <Link href="/" className="text-blue-600 underline">home</Link> in {count} seconds.
      </p>
      <Link href="/" className="px-4 py-2 bg-violet-800 text-white rounded">Go to Home Now</Link>
    </div>
  );
}
