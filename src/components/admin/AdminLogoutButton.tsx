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
      className="rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? 'Keluar...' : 'Logout'}
    </button>
  );
}
