import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Pagination } from '@/components/Pagination';

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
        <main className=' flex flex-col  h-screen max-w-[1000px]  mx-auto  overflow-y-scroll '>
          <div className='border fixed inset-y-0 w-[200px] sm:p-4 p-2 sm:block hidden '>
            <Sidebar />
          </div>

      
            {children}
          
        </main>
      </body>
    </html>
  );
}
