import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/providers/AuthProvider';
import Toast from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EcoSpark Hub - Share Your Sustainability Ideas',
  description: 'A community portal for sharing and discovering sustainable ideas to help the environment.',
  keywords: ['sustainability', 'ideas', 'environment', 'eco-friendly', 'community'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}
