import type { Metadata, Viewport } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/context';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { CookieConsent } from '@/components/CookieConsent';

// ===================
// FONTS
// ===================

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
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
  themeColor: '#0F172A',
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
      <body className={`${inter.variable} ${spaceMono.variable} font-sans antialiased`}>
        <AuthProvider>
          <I18nProvider>
            {children}
            <CookieConsent />
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
