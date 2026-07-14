import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Panel | D\'Mimah Donuts',
  description: 'Area admin D\'Mimah Donuts',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FEF6FB] text-[color:var(--text-dark)]">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
