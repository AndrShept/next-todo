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
      <body className={`${inter.className} `}>
        <main className=' flex  h-screen max-w-[1000px]  mx-auto   '>
        
            <Sidebar />
       

          <div className=' flex-1 h-full flex  flex-col   sm:p-4 p-2 border-r  '>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
