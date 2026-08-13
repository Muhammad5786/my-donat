'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <div className="min-h-screen bg-[#FEF6FB] text-[color:var(--text-dark)]">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1">
          <div className={`mx-auto w-full max-w-7xl ${isLoginPage ? '' : 'md:pl-72'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
