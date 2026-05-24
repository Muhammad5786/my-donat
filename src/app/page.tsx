import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import TestimonialCard from '@/components/TestimonialCard';
import SectionWrapper from '@/components/SectionWrapper';
import { MessageCircle, Clock, Sparkles, Truck, CheckCircle, Package, Shield, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: "D'Mimah Donuts - Fresh Premium Homemade Donuts Yogyakarta",
  description: "Donat mini premium homemade dari Yogyakarta. Fresh by preorder untuk momen spesial, hampers, dan hadiah.",
  keywords: ["donat yogyakarta", "donat homemade", "donat premium", "donat mini"],
};

const products = [
  { name: 'Domini', description: 'Donat mini premium dengan berbagai topping. Perfect for sharing, aesthetic presentation, and sweet gifts.', price: '12 pcs - Rp 60.000', emoji: '🍩', tag: 'Best Seller', tagColor: 'bg-[#D77FA1]' },
  { name: 'DonPiz', description: 'Mini donut pizza with bolognese, mozzarella, and real chicken. Savory meets sweet in the most delightful way.', price: '12 pcs - Rp 70.000', emoji: '🍕', tag: 'Savory', tagColor: 'bg-[#A07898]' },
  { name: 'Big Donut', description: 'Donat ukuran besar dengan topping premium. For those who love a generous, satisfying treat.', price: '6 pcs - Rp 50.000', emoji: '🎉' },
  { name: 'Bomboloni', description: 'Italian-style filled donuts, soft and pillowy with creamy fillings in every bite.', price: '8 pcs Rp 40k / 10 pcs Rp 50k', emoji: '🧁', tag: 'Filling', tagColor: 'bg-[#b5a0d8]' },
  { name: 'Fudgy Brownies', description: 'Premium baked brownies with high quality chocolate and butter. Various toppings. Ships nationwide!', price: 'Hubungi kami', emoji: '🍫', tag: 'Ship Nationwide', tagColor: 'bg-[#6B4C5E]' },
  { name: 'Rollcake', description: 'Premium butter rollcake with generous, creamy fillings. Light, fluffy, and oh-so-elegant.', price: 'Hubungi kami', emoji: '🎂' },
  { name: 'Brownies Kukus', description: 'Steamed brownies with a moist, rich texture. Classic Indonesian favourite with a premium twist.', price: 'Hubungi kami', emoji: '🟫' },
  { name: 'Bolu Tape', description: 'Soft sponge cake made with traditional tape fermented cassava. Uniquely Indonesian, uniquely delicious.', price: 'Hubungi kami', emoji: '🍰' },
  { name: 'Bolu Pisang', description: 'Moist banana sponge cake with a warm homemade aroma. A comforting classic reimagined.', price: 'Hubungi kami', emoji: '🍌' },
];

const testimonials = [
  { name: 'Amelia R.', location: 'Sleman, Yogyakarta', text: 'Donatnya beneran fresh banget! Buat hampers ulang tahun teman, tampilannya cantik dan rasanya enak. Pasti repeat order lagi.', rating: 5, initial: 'A', bgColor: 'from-pink-100 to-pink-200' },
  { name: 'Dewi S.', location: 'Bantul, Yogyakarta', text: 'Pesan buat snack kantor, langsung habis! Ukurannya pas, packaging rapi, dan harganya sangat worth it. Highly recommended.', rating: 5, initial: 'D', bgColor: 'from-purple-100 to-pink-100' },
  { name: 'Farah M.', location: 'Kota Yogyakarta', text: 'Donat mini-nya lucu banget buat hadiah. Fudgy brownies-nya juga mantap, bisa dikirim ke luar kota!', rating: 5, initial: 'F', bgColor: 'from-blue-100 to-purple-100' },
];

const faqs = [
  { q: 'Bagaimana cara preorder?', a: 'Hubungi kami via WhatsApp minimal H-3 sebelum tanggal pengiriman. Kami akan konfirmasi slot dan detail pesanan.' },
  { q: 'Apakah bisa request topping custom?', a: 'Tentu bisa! Kami melayani request topping custom untuk beberapa produk. Konsultasikan dulu via WhatsApp.' },
  { q: 'Area pengiriman mana saja?', a: 'Kami deliver ke seluruh Yogyakarta. Gratis ongkir radius 5km, biaya 5k-15k untuk area sekitar Jogja. Fudgy Brownies bisa dikirim ke luar kota via JNE, J&T, Pos Indonesia, Paxel, dan TIKI.' },
  { q: 'Metode pembayaran apa saja?', a: 'Kami menerima QRIS, transfer BSI, dan transfer BCA. Detail rekening dikirimkan setelah konfirmasi pesanan.' },
  { q: 'Berapa lama brownies bisa tahan?', a: 'Fudgy Brownies kami tahan lebih dari 2 minggu dengan penyimpanan yang tepat, sehingga aman dikirim ke luar kota.' },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />

      {/* SIGNATURE PRODUCT */}
      <SectionWrapper className="py-20 px-5 sm:px-8 bg-white/40" id="signature">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-80 sm:w-96 h-80 sm:h-96 rounded-[2.5rem] bg-gradient-to-br from-[#FEF6FB] via-pink-50 to-[#E6B2C6]/40 shadow-xl shadow-pink-100/50 border border-pink-100/60 flex flex-col items-center justify-center gap-4">
                <div className="text-7xl">🍩</div>
                <div className="text-center">
                  <p className="font-heading text-3xl font-semibold text-[#D77FA1]">Domini</p>
                  <p className="text-[#A07898] text-sm mt-1">Donat Mini Premium</p>
                </div>
                <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-[#D77FA1]/30" />
                <div className="absolute bottom-8 right-8 w-5 h-5 rounded-full bg-[#E6B2C6]/50" />
              </div>
              <div className="absolute -bottom-4 right-4 bg-[#D77FA1] text-white rounded-2xl px-5 py-3 shadow-lg shadow-pink-200/50">
                <p className="text-xs opacity-80">Mulai dari</p>
                <p className="font-heading font-bold text-xl">Rp 60.000</p>
                <p className="text-xs opacity-70">12 pcs</p>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <span className="inline-block bg-pink-50 text-[#D77FA1] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Signature Product</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-[#2D1B2E] mb-5 leading-tight">
                Donat Mini<br /><span className="gradient-text">yang Bikin Kagum</span>
              </h2>
              <p className="text-[#6B4C5E] leading-relaxed mb-3">Sering bingung mencari camilan yang fresh, mudah dinikmati bersama, dan tetap cantik untuk dijadikan hadiah?</p>
              <p className="text-[#A07898] leading-relaxed text-sm mb-6">Donat mini premium kami dibuat fresh dari dapur, pas untuk sharing, dan tampil estetik untuk setiap momen spesial. Pesan sekarang sebelum slot pre-order penuh!</p>
              <ul className="space-y-2.5 mb-8 text-left max-w-xs mx-auto lg:mx-0">
                {['Various toppings available', 'Perfect for sharing and gifts', 'Aesthetic presentation', 'Made fresh by preorder'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[#6B4C5E]">
                    <CheckCircle size={15} className="text-[#D77FA1] flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/62000000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#D77FA1] hover:bg-[#c06890] text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-pink-200/50 hover:shadow-xl hover:-translate-y-0.5">
                <MessageCircle size={17} />Pesan Domini Sekarang
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ALL PRODUCTS */}
      <SectionWrapper className="py-20 px-5 sm:px-8" id="menu">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-pink-50 text-[#D77FA1] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Our Menu</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-[#2D1B2E] mb-4">Semua yang <span className="gradient-text">Kami Buat</span></h2>
            <p className="text-[#A07898] max-w-md mx-auto">Dibuat dengan bahan pilihan, penuh perhatian, dan cinta. Setiap gigitan adalah kebahagiaan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product.name} {...product} delay={i * 0.07} />
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="https://wa.me/62000000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 border-2 border-[#D77FA1] text-[#D77FA1] hover:bg-[#D77FA1] hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300">
              <MessageCircle size={17} />Konsultasi Menu via WhatsApp
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* WHY PREORDER */}
      <SectionWrapper className="py-20 px-5 sm:px-8 bg-gradient-to-br from-[#2D1B2E] to-[#4a2d4a] relative overflow-hidden" id="preorder">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D77FA1]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D6E5FA]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-white/10 text-white/70 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">Why Preorder?</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-white mb-4">Fresh Karena <span className="text-[#E6B2C6]">Dibuat Untukmu</span></h2>
            <p className="text-white/50 max-w-md mx-auto">Kami tidak stok produk. Setiap pesanan dibuat segar, khusus untukmu.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {[
              { icon: MessageCircle, step: '01', title: 'Order', desc: 'Chat kami via WhatsApp minimal H-3. Kami konfirmasi slot dan detail pesanan.' },
              { icon: Sparkles, step: '02', title: 'Freshly Made', desc: 'Kami persiapkan dan buat pesananmu fresh dari dapur dengan bahan pilihan.' },
              { icon: Truck, step: '03', title: 'Delivered', desc: 'Produk dikirim/diambil sesuai jadwal yang disepakati. Fresh guaranteed!' },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="text-center p-7 bg-white/8 backdrop-blur-sm border border-white/12 rounded-3xl">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#D77FA1]/20 border border-[#D77FA1]/30 flex items-center justify-center">
                  <Icon size={22} className="text-[#E6B2C6]" />
                </div>
                <span className="text-[#D77FA1]/60 text-xs font-bold tracking-widest">{step}</span>
                <h3 className="font-heading text-lg font-semibold text-white mt-1 mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: 'Preorder H-3', sub: 'Minimal 3 hari sebelumnya' },
              { icon: Package, label: 'Min. Order Rp 60k', sub: 'Tidak ada minimum kuantitas' },
              { icon: Truck, label: 'Free Delivery', sub: 'Gratis ongkir radius 5km' },
              { icon: MessageCircle, label: 'Chat First', sub: 'Via WhatsApp anytime' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3 bg-white/8 border border-white/12 rounded-2xl p-4">
                <div className="w-9 h-9 rounded-xl bg-[#D77FA1]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-[#E6B2C6]" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* TRUST / TESTIMONIALS */}
      <SectionWrapper className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-pink-50 text-[#D77FA1] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Trusted by Customers</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-[#2D1B2E] mb-4">Kata Mereka<span className="gradient-text"> tentang Kami</span></h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Shield, label: 'Halal Certified', sub: 'ID34110019557010924' },
              { icon: Star, label: 'Homemade Quality', sub: 'Bahan pilihan premium' },
              { icon: CheckCircle, label: 'Repeat Customers', sub: '80% pelanggan setia' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 bg-white/80 border border-pink-100 rounded-2xl px-5 py-3 shadow-sm">
                <Icon size={18} className="text-[#D77FA1]" />
                <div>
                  <p className="font-semibold text-[#2D1B2E] text-sm">{label}</p>
                  <p className="text-[#A07898] text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* DELIVERY */}
      <SectionWrapper className="py-20 px-5 sm:px-8 bg-[#FEF6FB]" id="delivery">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#D6E5FA] text-[#5a7fc4] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Nationwide Shipping</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-[#2D1B2E] mb-5 leading-tight">Kirim ke Seluruh<br /><span className="gradient-text">Penjuru Indonesia</span></h2>
              <p className="text-[#6B4C5E] leading-relaxed mb-4">Fudgy Brownies kami dikemas dengan aman dan tahan lebih dari 2 minggu, sehingga cocok untuk dikirim ke luar kota bahkan ke luar pulau.</p>
              <p className="text-[#A07898] text-sm mb-8">Kami bekerja sama dengan kurir terpercaya untuk memastikan produkmu sampai dalam kondisi sempurna.</p>
              <div className="flex flex-wrap gap-2">
                {['JNE', 'J&T', 'Pos Indonesia', 'Paxel', 'TIKI'].map((courier) => (
                  <span key={courier} className="bg-white border border-pink-100 text-[#6B4C5E] text-sm font-semibold px-4 py-2 rounded-full shadow-sm">{courier}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 rounded-[2.5rem] bg-gradient-to-br from-[#D6E5FA]/60 to-[#E6B2C6]/40 border border-white/80 shadow-lg flex flex-col items-center justify-center gap-3">
                <div className="text-6xl">📦</div>
                <p className="font-heading text-xl font-semibold text-[#2D1B2E]">Safe Packaging</p>
                <p className="text-[#A07898] text-sm text-center px-6">Dikemas dengan teliti agar sampai dalam kondisi terbaik</p>
                <div className="absolute -top-3 -right-3 bg-[#D77FA1] text-white text-xs font-bold px-3 py-1.5 rounded-full">Tahan 2+ Minggu</div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper className="py-20 px-5 sm:px-8" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-pink-50 text-[#D77FA1] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">FAQ</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-[#2D1B2E] mb-4">Pertanyaan <span className="gradient-text">Umum</span></h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/80 border border-pink-100/60 rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-semibold text-[#2D1B2E] mb-2 text-base">{faq.q}</h3>
                <p className="text-[#6B4C5E] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-br from-pink-50 to-[#D6E5FA]/30 border border-pink-100 rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-[#2D1B2E] mb-3">Metode Pembayaran</h3>
            <div className="flex flex-wrap gap-2">
              {['QRIS', 'BSI', 'BCA'].map((method) => (
                <span key={method} className="bg-white border border-pink-100 text-[#D77FA1] text-sm font-bold px-4 py-2 rounded-full shadow-sm">{method}</span>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FINAL CTA */}
      <SectionWrapper className="py-20 px-5 sm:px-8" id="contact">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-[#D77FA1] to-[#c06890] rounded-[2.5rem] p-12 sm:p-16 shadow-2xl shadow-pink-200/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-4xl mb-5 block">🍩</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-4">Reserve Your Preorder Slot Today</h2>
              <p className="text-white/70 mb-8 max-w-sm mx-auto leading-relaxed">Jangan sampai kehabisan slot. Pesan sekarang dan nikmati donat premium fresh dari dapur kami!</p>
              <a href="https://wa.me/62000000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white text-[#D77FA1] hover:bg-pink-50 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base">
                <MessageCircle size={20} />Chat WhatsApp Sekarang
              </a>
              <p className="text-white/50 text-sm mt-5">Kami biasanya reply dalam 1 jam - Senin-Minggu</p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
