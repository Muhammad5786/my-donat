import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Admin Panel | D\'Mimah Donuts',
  description: 'Area admin D\'Mimah Donuts',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#FEF6FB]">{children}</div>;
}
