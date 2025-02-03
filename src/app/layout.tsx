import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import { I18nProvider } from "@/components/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Service POS System",
  description: "A Point of Sale system for selling services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <I18nProvider>{children}</I18nProvider>
        </CartProvider>
      </body>
    </html>
  );
}
