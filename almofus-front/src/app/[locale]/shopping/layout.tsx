import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Almofus - Shopping',
  description: 'Almanax manager',
};

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
