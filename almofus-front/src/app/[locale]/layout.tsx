import type { Metadata } from 'next';
import { Electrolize, Orbitron } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/global/header/header';

const electrolize = Electrolize({
  variable: '--font-electrolize',
  subsets: ['latin'],
  weight: ['400'],
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Almofus',
  description: 'Almanax manager',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <NextIntlClientProvider messages={messages}>
        <body className={`${orbitron.variable} ${electrolize.variable}`}>
          <Header />
          <main>{children}</main>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
