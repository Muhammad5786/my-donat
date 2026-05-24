'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  emoji: string;
  tag?: string;
  tagColor?: string;
  delay?: number;
}

export default function ProductCard({
  name,
  description,
  price,
  emoji,
  tag,
  tagColor = 'bg-[#D77FA1]',
  delay = 0,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative bg-white/80 hover:bg-white border border-pink-100/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-pink-100/60 transition-all duration-300 cursor-pointer"
    >
      {/* Tag */}
      {tag && (
        <span className={`absolute top-4 right-4 ${tagColor} text-white text-xs font-bold px-2.5 py-1 rounded-full z-10`}>
          {tag}
        </span>
      )}

      {/* Image placeholder */}
      <div className="h-44 bg-gradient-to-br from-[#FEF6FB] via-pink-50 to-[#E6B2C6]/25 flex items-center justify-center relative overflow-hidden">
        <motion.span
          className="text-5xl"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {emoji}
        </motion.span>
        {/* subtle circle behind */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#D77FA1]/8 group-hover:bg-[#D77FA1]/15 transition-all duration-500 scale-125" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-[#2D1B2E] mb-1">{name}</h3>
        <p className="text-[#A07898] text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-heading text-[#D77FA1] text-base font-semibold">{price}</span>
          <a
            href="https://wa.me/62000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#D77FA1] hover:text-white bg-pink-50 hover:bg-[#D77FA1] px-3 py-2 rounded-full transition-all duration-300"
          >
            <ShoppingBag size={13} />
            Order
          </a>
        </div>
      </div>
    </motion.div>
  );
}
