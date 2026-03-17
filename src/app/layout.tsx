import Navbar from "@/components/ui/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/ui/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-barlow',
});

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
        className={`${barlow.variable} antialiased bg-[#F3EEFF]`}
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
