'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Soft background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-[#E6B2C6]/30 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-32 w-[420px] h-[420px] bg-[#D6E5FA]/40 rounded-full blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D77FA1]/10 rounded-full blur-[80px]" />
      </div>

      {/* Decorative dots */}
      <div className="absolute top-24 left-10 w-2 h-2 rounded-full bg-[#D77FA1]/40" />
      <div className="absolute top-40 right-16 w-3 h-3 rounded-full bg-[#E6B2C6]/60" />
      <div className="absolute bottom-40 left-20 w-2.5 h-2.5 rounded-full bg-[#D6E5FA]/80" />
      <div className="absolute bottom-32 right-24 w-1.5 h-1.5 rounded-full bg-[#D77FA1]/30" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/70 border border-pink-100 rounded-full px-4 py-1.5 text-[#D77FA1] text-xs font-semibold tracking-wide mb-6 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D77FA1] animate-pulse" />
              Fresh from Kitchen to Home!
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-[2.6rem] sm:text-5xl lg:text-[3.2rem] leading-[1.15] font-semibold text-[#2D1B2E] mb-5"
            >
              Premium Mini Donuts{' '}
              <span className="gradient-text">
                for Sharing &amp; Special Moments
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#6B4C5E] text-base sm:text-lg leading-relaxed mb-4 max-w-md mx-auto lg:mx-0"
            >
              Fresh homemade donuts made by preorder. Beautifully crafted for gifts, gatherings, and sweet moments.
            </motion.p>

            {/* Indonesian copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-[#A07898] text-sm leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 italic"
            >
              Nikmati donat premium di rumah Anda!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="https://wa.me/62000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-[#D77FA1] hover:bg-[#c06890] text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-200/60 hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                Chat WhatsApp
              </a>
              <Link
                href="/menu"
                className="flex items-center justify-center gap-2.5 bg-white/80 hover:bg-white border border-pink-100 text-[#D77FA1] font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                View Menu
              </Link>
            </motion.div>

            {/* Social proof mini */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 flex items-center justify-center lg:justify-start gap-4"
            >
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 border-2 border-white" />
                ))}
              </div>
              <p className="text-[#A07898] text-sm">
                <span className="font-semibold text-[#6B4C5E]">100+</span> happy customers in Yogyakarta
              </p>
            </motion.div>
          </div>

          {/* Hero visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main product card */}
              <div className="relative w-72 sm:w-80 lg:w-[360px] h-72 sm:h-80 lg:h-[360px] rounded-[2.5rem] bg-gradient-to-br from-white/90 via-pink-50/80 to-[#E6B2C6]/30 shadow-2xl shadow-pink-200/40 border border-white/80 overflow-hidden flex items-center justify-center">
                {/* Placeholder donut visual */}
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-[#E6B2C6]/60 to-[#D77FA1]/40 flex items-center justify-center shadow-inner">
                    <div className="w-20 h-20 rounded-full bg-[#FEF6FB] shadow-md flex items-center justify-center">
                      <span className="text-4xl">🍩</span>
                    </div>
                  </div>
                  <p className="mt-4 font-heading text-[#D77FA1] font-semibold text-lg">Domini</p>
                  <p className="text-[#A07898] text-sm">12 pcs — Rp 60.000</p>
                </div>

                {/* Floating tag */}
                <div className="absolute top-5 right-5 bg-[#D77FA1] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  Best Seller
                </div>
              </div>

              {/* Floating accent cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-3 shadow-lg shadow-pink-100/60 border border-pink-50"
              >
                <p className="text-xs text-[#A07898] font-medium">Preorder H-3</p>
                <p className="text-sm font-bold text-[#D77FA1]">Fresh daily</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-4 -right-6 bg-white rounded-2xl p-3 shadow-lg shadow-pink-100/60 border border-pink-50"
              >
                <p className="text-xs text-[#A07898] font-medium">Free delivery</p>
                <p className="text-sm font-bold text-[#6B4C5E]">within 5km</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#A07898]"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
