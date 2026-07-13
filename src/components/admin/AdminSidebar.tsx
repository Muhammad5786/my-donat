'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderOpen, LayoutDashboard, LogOut, Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLogoutButton from './AdminLogoutButton';

const navigationItems = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/categories',
    label: 'Kategori',
    icon: FolderOpen,
  },
  {
    href: '/admin/products',
    label: 'Produk',
    icon: ShoppingBag,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Hide sidebar on login page
  const isLoginPage = pathname === '/admin/login';

  return isLoginPage ? null : (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-full border border-[#D77FA1]/40 bg-white p-3 text-[#2D1B2E] shadow-lg shadow-pink-100/80 transition hover:bg-[#FFF5FA] md:hidden"
        aria-label="Buka menu admin"
      >
        <Menu size={20} />
      </button>

      {isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/35 backdrop-blur-[2px] md:hidden"
          aria-label="Tutup menu admin"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-[#2D1B2E] text-white shadow-2xl shadow-[#2D1B2E]/30 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-pink-200/90">
              Admin Panel
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">D&apos;Mimah</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-white/10 p-2 text-pink-100 transition hover:bg-white/10 md:hidden"
            aria-label="Tutup menu admin"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'border-l-4 border-[#D77FA1] bg-[#D77FA1] text-white shadow-lg shadow-pink-200/20'
                    : 'text-pink-100/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="my-4 border-t border-white/10 pt-4" />

          <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
            <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-pink-100/90">
              <LogOut size={16} />
              <span>Logout</span>
            </div>
            <div className="mt-3">
              <AdminLogoutButton />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
