import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import QueryProvider from '@/components/QueryProdvider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'test TODO',
  description: 'loading',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={`${inter.className} `}>
        <QueryProvider>
          <main className=' flex  h-[100dvh] max-w-[1000px]  mx-auto    '>
            <Sidebar />

            <div className=' flex-1 h-full flex  flex-col   sm:p-4 px-4 py-6 border-r  '>
              {children}
              <Toaster />
            </div>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
