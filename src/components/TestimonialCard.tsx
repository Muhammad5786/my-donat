'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  rating?: number;
  initial?: string;
  bgColor?: string;
  delay?: number;
}

export default function TestimonialCard({
  name,
  location,
  text,
  rating = 5,
  initial,
  bgColor = 'from-pink-100 to-purple-100',
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/80 border border-pink-100/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-[#D77FA1] text-[#D77FA1]" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[#6B4C5E] text-sm leading-relaxed mb-4 italic">&ldquo;{text}&rdquo;</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${bgColor} flex items-center justify-center font-bold text-[#D77FA1] text-sm`}>
          {initial || name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-[#2D1B2E] text-sm">{name}</p>
          <p className="text-[#A07898] text-xs">{location}</p>
        </div>
      </div>
    </motion.div>
  );
}
