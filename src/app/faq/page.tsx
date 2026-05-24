import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "FAQ - D'Mimah Donuts",
  description: "Pertanyaan umum seputar preorder, pengiriman, pembayaran, dan produk D'Mimah Donuts.",
};

const faqs = [
  {
    category: 'Preorder',
    items: [
      { q: 'Bagaimana cara preorder?', a: 'Hubungi kami via WhatsApp minimal H-3 sebelum tanggal pengiriman/pengambilan yang diinginkan. Kami akan konfirmasi ketersediaan slot dan detail pesanan Anda.' },
      { q: 'Apakah ada minimum order?', a: 'Minimum order adalah Rp 60.000 per transaksi. Tidak ada minimum kuantitas per produk, selama total pesanan memenuhi minimum.' },
      { q: 'Apakah bisa request topping custom?', a: 'Tentu bisa! Kami melayani request topping custom untuk beberapa produk. Konsultasikan dulu dengan kami via WhatsApp untuk mengetahui ketersediaannya.' },
      { q: 'Bolehkah pesan lebih dari satu jenis produk?', a: 'Tentu boleh! Bahkan kami sangat menyarankan mencoba berbagai produk untuk momen yang berbeda.' },
    ],
  },
  {
    category: 'Pengiriman',
    items: [
      { q: 'Area pengiriman mana saja yang dilayani?', a: 'Kami melayani pengiriman ke seluruh area Yogyakarta. Gratis ongkir untuk radius 5km dari dapur kami, dan biaya 5k-15k untuk area sekitar Jogja. Fudgy Brownies bisa dikirim ke luar kota via JNE, J&T, Pos Indonesia, Paxel, dan TIKI.' },
      { q: 'Apakah bisa dikirim ke luar kota atau luar pulau?', a: 'Ya! Khusus untuk Fudgy Brownies, kami melayani pengiriman ke luar kota dan luar pulau karena produk ini tahan lebih dari 2 minggu dengan dikemas aman.' },
      { q: 'Produk dikemas seperti apa untuk pengiriman?', a: 'Kami menggunakan kemasan yang dirancang khusus untuk menjaga produk tetap aman dan dalam kondisi terbaik selama pengiriman.' },
    ],
  },
  {
    category: 'Pembayaran',
    items: [
      { q: 'Metode pembayaran apa saja yang tersedia?', a: 'Kami menerima QRIS, transfer BSI, dan transfer BCA. Detail rekening akan dikirimkan setelah konfirmasi pesanan.' },
      { q: 'Kapan pembayaran harus dilakukan?', a: 'Pembayaran dilakukan saat konfirmasi pesanan (DP atau full payment), sebelum proses pembuatan dimulai.' },
    ],
  },
  {
    category: 'Produk',
    items: [
      { q: 'Berapa lama brownies bisa tahan?', a: 'Fudgy Brownies kami tahan lebih dari 2 minggu dengan penyimpanan yang tepat (suhu ruangan atau kulkas), sehingga aman dikirim ke luar kota.' },
      { q: 'Apakah produk D\'Mimah sudah halal?', a: 'Ya, seluruh produk kami menggunakan bahan-bahan halal. Nomor sertifikasi halal kami: ID34110019557010924.' },
      { q: 'Bagaimana cara menyimpan produk yang sudah diterima?', a: 'Donat sebaiknya dinikmati di hari yang sama. Brownies dan kue bisa disimpan di suhu ruangan atau kulkas untuk ketahanan lebih lama. Kami akan memberikan instruksi penyimpanan spesifik bersama setiap pesanan.' },
    ],
  },
];

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
          {faqs.map((cat) => (
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
            href="https://wa.me/62000000000"
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
