import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Almofus - Almanax',
  description: 'Almanax manager',
};

export default async function AlmanaxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
