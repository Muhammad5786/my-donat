'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message || 'Login gagal. Periksa email dan password Anda.');
      setIsSubmitting(false);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FEF6FB] px-4 py-12">
      <div className="w-full max-w-md rounded-[28px] border border-[color:var(--pink-primary)]/20 bg-white p-8 shadow-[0_20px_60px_rgba(215,127,161,0.18)]">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--pink-primary)]">
            Admin Panel
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[color:var(--text-dark)]">
            Masuk ke dashboard
          </h1>
          <p className="mt-3 text-sm text-[color:var(--text-dark)]/70">
            Halaman ini khusus admin. Bukan untuk umum.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[color:var(--text-dark)]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-[color:var(--pink-primary)]/20 bg-[#FFF8FC] px-4 py-3 text-sm text-[color:var(--text-dark)] outline-none transition focus:border-[color:var(--pink-primary)]"
              placeholder="admin@dmimah.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[color:var(--text-dark)]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-[color:var(--pink-primary)]/20 bg-[#FFF8FC] px-4 py-3 text-sm text-[color:var(--text-dark)] outline-none transition focus:border-[color:var(--pink-primary)]"
              placeholder="Masukkan password"
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[color:var(--pink-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}
