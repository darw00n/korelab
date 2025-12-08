import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/context';

// ===================
// FONTS
// ===================

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

// ===================
// METADATA
// ===================

export const metadata: Metadata = {
  title: 'Korelab - Cosmétique Naturelle Marocaine',
  description: 'Découvre ta routine beauté personnalisée avec des produits 100% naturels du Maroc. Diagnostic IA gratuit.',
  keywords: ['cosmétique', 'naturel', 'maroc', 'huile argan', 'ghassoul', 'beauté', 'skincare'],
  authors: [{ name: 'Korelab' }],
  openGraph: {
    title: 'Korelab - Cosmétique Naturelle Marocaine',
    description: 'Découvre ta routine beauté personnalisée avec des produits 100% naturels du Maroc.',
    type: 'website',
    locale: 'fr_MA',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#B45309',
};

// ===================
// ROOT LAYOUT
// ===================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
