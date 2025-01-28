import './globals.css';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-datepicker/dist/react-datepicker.css';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/cn';
import { Providers } from '@/components/Providers';
import { auth } from '@/auth';
import React from 'react';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME ?? 'SocialMedia App',
  description: 'A social media web app, with built in usage cap.',
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" className="dark overflow-y-scroll">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={cn('bg-background text-foreground', poppins.className)}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
