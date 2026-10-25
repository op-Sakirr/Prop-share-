import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'PropShare - WhatsApp Property Link Generator',
  description: 'Create instant, gorgeous real estate listing showcases with zero database. All details are encoded into unbreakable URL-safe Base64 links for WhatsApp sharing.',
  openGraph: {
    title: 'PropShare - WhatsApp Property Link Generator',
    description: 'Create instant, gorgeous real estate listing showcases with zero database. All details are encoded into unbreakable URL-safe Base64 links for WhatsApp sharing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropShare - WhatsApp Property Link Generator',
    description: 'Create instant, gorgeous real estate listing showcases with zero database. All details are encoded into unbreakable URL-safe Base64 links for WhatsApp sharing.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
