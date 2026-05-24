'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Why Preorder?', href: '/#preorder' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-[0_4px_32px_rgba(215,127,161,0.12)] border-b border-pink-100/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-logo text-xl font-800 tracking-tight text-[#D77FA1] group-hover:text-[#c06890] transition-colors">
            D&apos;Mimah
          </span>
          <span className="font-logo text-xs font-500 text-[#A07898] tracking-widest uppercase mt-0.5">
            Donuts
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-[#6B4C5E] hover:text-[#D77FA1] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#D77FA1] rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://wa.me/62000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-[#D77FA1] hover:bg-[#c06890] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 shadow-md shadow-pink-200/50 hover:shadow-lg hover:shadow-pink-200/60 hover:-translate-y-0.5"
        >
          Order Now
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl text-[#D77FA1] hover:bg-pink-50 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-b border-pink-100/60 px-5 pb-5"
          >
            <ul className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 px-3 text-[#6B4C5E] font-medium hover:text-[#D77FA1] hover:bg-pink-50/60 rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="https://wa.me/62000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center bg-[#D77FA1] text-white font-semibold py-3 px-5 rounded-xl text-sm"
                >
                  Order Now via WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
