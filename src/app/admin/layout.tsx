import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Area admin D\'Mimah Donuts.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
