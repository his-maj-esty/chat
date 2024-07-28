"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { RecoilProvider } from "./_providers/recoil-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster />
      <RecoilProvider>
        <body className={inter.className}>{children}</body>
      </RecoilProvider>
    </html>
  );
}
