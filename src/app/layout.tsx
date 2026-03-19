import Navbar from "@/components/ui/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/ui/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-barlow',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
});

const dmsSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  title: "Muscle ton Corps",
  description: "Application de suivi de musculation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body  
        className={`${barlow.variable} ${dmSans.variable} ${dmsSerif.variable}`}
      >
        <AuthProvider >
          <Navbar />
          <Toaster position="top-right" />
          {children}
          <ScrollToTop />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
