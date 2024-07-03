import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyProvider } from "@/context/MyContext";
import dynamic from 'next/dynamic'
const MainHeader= dynamic(()=>import('@/components/MainHeader/MainHeader'),{ssr:false})
const MainFooter= dynamic(()=>import('@/components/MainFooter/MainFooter'),{ssr:false})

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Corner Store RorApp",
  description: "Basic store app for small business",
  manifest: "/manifest.json",
  keywords: "store, small business, full stack, Next.js, Nest.js, MongoDB, Vercel, Railway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyProvider>
          <MainHeader />
          {children}
          <MainFooter />
        </MyProvider>
        </body>
    </html>
  );
}
