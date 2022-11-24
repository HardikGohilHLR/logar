// Constants
import { Metadata } from 'next';

export const META_DATA: Metadata = {
  title: 'Logar',
  description:
    'Logar is an open-source authentication system built with Next.js, Clerk, Supabase, Drizzle ORM, Tailwind CSS, and ShadCN UI. It provides essential authentication features such as login, signup, password reset, and profile management with a modern, user-friendly interface.',
  icons: { icon: '/favicon.ico' },
  keywords: [],
  authors: [{ name: 'Hardik Gohil' }],
  openGraph: {
    title: 'Logar',
    description:
      'Logar is an open-source authentication system built with Next.js, Clerk, Supabase, Drizzle ORM, Tailwind CSS, and ShadCN UI. It provides essential authentication features such as login, signup, password reset, and profile management with a modern, user-friendly interface.',
    type: 'website',
    siteName: 'Logar',
    url: process.env.NEXT_PUBLIC_SITE_URL!,
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/portfolio.jpg` }, { url: `/images/portfolio.jpg` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logar - Auth',
    description:
      'Logar is an open-source authentication system built with Next.js, Clerk, Supabase, Drizzle ORM, Tailwind CSS, and ShadCN UI. It provides essential authentication features such as login, signup, password reset, and profile management with a modern, user-friendly interface.',
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/portfolio.jpg` }, { url: `/images/portfolio.jpg` }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_VERIFICATION_GOOGLE,
  },
};
