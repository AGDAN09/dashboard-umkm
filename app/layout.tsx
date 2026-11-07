import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = { title: "Toko Agdan - Dashboard UMKM" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans">
        <div className="flex flex-col-reverse md:flex-row">
          <Sidebar />
          <main className="min-h-screen flex-1 p-5 md:p-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
