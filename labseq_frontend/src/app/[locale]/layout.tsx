import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/navbar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import {Footer} from "../../components/Footer";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <PrimeReactProvider>
            <body className="bg-light">
                <NextIntlClientProvider messages={messages}>
                    <header>
                        <Navbar/>
                    </header>
                    <main className="w-full h-full inline-block z-0 min-h-screen">{children}</main>
                    <Footer/>
                </NextIntlClientProvider>
            </body>
        </PrimeReactProvider>
    </html>
  );
}