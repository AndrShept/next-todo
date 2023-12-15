import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';

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
      <body className={inter.className}>
        <main className=' flex  max-w-[1400px] mx-auto'>
          <div className='border fixed inset-y-0 w-[200px] sm:p-4 p-2 '>
            <Sidebar />
          </div>
          <div className='  flex-1 ml-[200px] sm:p-4 p-2 border-r '>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
