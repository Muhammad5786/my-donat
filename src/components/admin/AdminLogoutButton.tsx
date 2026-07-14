'use client';

import { signOut } from '@/lib/supabase/actions';
import { useTransition } from 'react';

export default function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(() => {
      void signOut();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? 'Keluar...' : 'Logout'}
    </button>
  );
}
