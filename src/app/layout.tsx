import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import QueryProvider from '@/components/QueryProdvider';
import { Toaster } from '@/components/ui/sonner';
import { Spotlight } from '@/components/ui/Spotlight';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { ModalProvider } from '@/components/provider/ModalProvider';

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
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} `}>
        <QueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <main className=' flex   max-w-[1000px]  mx-auto antialiased dark:bg-grid-white/[0.02] bg-grid-black/[0.02]   '>
              <Sidebar />

              <section className=' flex-1 h-full flex  flex-col   sm:p-5 p-3  border-r  '>


                {children}
                <ModalProvider />
                <Toaster />
              </section>
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
