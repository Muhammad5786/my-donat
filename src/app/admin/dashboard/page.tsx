import { signOut } from '@/lib/supabase/actions';

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FEF6FB] px-4 py-12">
      <div className="w-full max-w-xl rounded-[28px] border border-[color:var(--pink-primary)]/20 bg-white p-8 shadow-[0_20px_60px_rgba(215,127,161,0.18)]">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--pink-primary)]">
          Admin Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[color:var(--text-dark)]">
          Selamat datang di panel admin
        </h1>
        <p className="mt-3 text-sm text-[color:var(--text-dark)]/70">
          Halaman ini sedang dalam tahap pengembangan. Anda dapat mengelola konten donat di sini.
        </p>

        <form action={signOut} className="mt-6">
          <button
            type="submit"
            className="rounded-2xl border border-[color:var(--pink-primary)]/30 px-4 py-3 text-sm font-semibold text-[color:var(--pink-primary)] transition hover:bg-[color:var(--pink-primary)]/10"
          >
            Keluar
          </button>
        </form>
      </div>
    </div>
  );
}
