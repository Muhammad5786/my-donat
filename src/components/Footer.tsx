import Link from 'next/link';
import { Share2, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2D1B2E] text-white/70">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-logo text-2xl font-800 text-white tracking-tight">D&apos;Mimah</span>
              <span className="font-logo text-xs text-white/40 tracking-widest uppercase">Donuts</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs mb-5">
              Homemade premium donuts freshly crafted for your special moments. Based in Yogyakarta, Indonesia.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/dmimahdonuts.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#D77FA1] flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Share2 size={16} />
              </a>
              <a
                href="https://wa.me/62000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Menu', href: '/menu' },
                { label: 'Why Preorder?', href: '/#preorder' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>Yogyakarta, Indonesia</li>
              <li>
                <a
                  href="https://wa.me/62000000000"
                  className="hover:text-white transition-colors duration-200"
                >
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/dmimahdonuts.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  @dmimahdonuts.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} D&apos;Mimah Donuts. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart size={11} className="fill-[#D77FA1] text-[#D77FA1]" /> in Yogyakarta
          </p>
        </div>
      </div>
    </footer>
  );
}
