import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope, Parisienne } from 'next/font/google';
import './globals.css';

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display'
});

const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body'
});

const scriptFont = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script'
});

export const metadata: Metadata = {
  title: "Andy & Kelly's Wedding",
  description:
    'A wedding invitation and RSVP landing page for celebrations in San Francisco, Malaysia, and Hong Kong.',
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
