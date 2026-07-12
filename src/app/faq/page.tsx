import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { businessWhatsApp, faqCategories } from '@/lib/content';

export const metadata: Metadata = {
  title: "FAQ - D'Mimah Donuts",
  description: "Pertanyaan umum seputar preorder, pengiriman, pembayaran, dan produk D'Mimah Donuts.",
};


export default function FAQPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-pink-50 text-[#D77FA1] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[#2D1B2E] mb-4">
            Pertanyaan <span className="gradient-text">Umum</span>
          </h1>
          <p className="text-[#A07898] max-w-sm mx-auto">
            Punya pertanyaan lain? Hubungi kami langsung via WhatsApp.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqCategories.map((cat) => (
            <section key={cat.category}>
              <h2 className="font-heading text-xl font-semibold text-[#D77FA1] mb-4 pl-1">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item, i) => (
                  <div key={i} className="bg-white/80 border border-pink-100/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <h3 className="font-heading font-semibold text-[#2D1B2E] mb-2 text-base">{item.q}</h3>
                    <p className="text-[#6B4C5E] text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-14 bg-gradient-to-br from-[#D77FA1] to-[#c06890] rounded-3xl p-9 text-center text-white">
          <h3 className="font-heading text-2xl font-semibold mb-3">Masih ada pertanyaan?</h3>
          <p className="text-white/70 text-sm mb-6">Kami siap membantu! Chat kami langsung via WhatsApp.</p>
          <a
            href={businessWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white text-[#D77FA1] font-bold px-7 py-3.5 rounded-full hover:bg-pink-50 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
          >
            <MessageCircle size={18} />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
