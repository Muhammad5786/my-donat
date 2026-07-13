import type { Metadata } from 'next';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dmimahdonuts.com'),
  title: {
    default: "D'Mimah Donuts | Premium Homemade Donuts from Yogyakarta",
    template: "%s | D'Mimah Donuts",
  },
  description:
    'Fresh premium homemade donuts dari Yogyakarta. Pesan donat mini premium untuk hampers, hadiah, dan momen spesial dengan preorder WhatsApp.',
  keywords: [
    'donat yogyakarta',
    'donat homemade',
    'donat premium',
    'donat mini',
    'hampers donat',
    'preorder donat',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.dmimahdonuts.com/',
    title: "D'Mimah Donuts",
    description:
      'Fresh premium homemade donuts dari Yogyakarta. Pesan donat mini premium untuk hampers, hadiah, dan momen spesial.',
    siteName: "D'Mimah Donuts",
    images: [
      {
        url: '/domini1.jpg',
        width: 1200,
        height: 630,
        alt: "D'Mimah Donuts",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "D'Mimah Donuts",
    description:
      'Fresh premium homemade donuts dari Yogyakarta. Pesan donat mini premium untuk hampers, hadiah, dan momen spesial.',
    images: ['/domini1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PC63W64V92" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-PC63W64V92');`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800&family=Fredoka:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#FEF6FB]">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
