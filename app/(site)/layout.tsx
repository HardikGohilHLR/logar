// Layout
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import clsx from 'clsx';

import '@/styles/globals.css';

import { AppLayout } from '@/components/imports';

import { Provider } from '@/context/provider';

const geistSans = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Home | Logar',
  description: 'Home | Logar',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={clsx(geistSans.className, 'antialiased')}>
        <Provider>
          <AppLayout>{children}</AppLayout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
