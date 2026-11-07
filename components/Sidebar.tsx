"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ReceiptText, Store } from "lucide-react";

const menu = [
  { href: "/", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/produk", label: "Produk", icon: Package },
  { href: "/pesanan", label: "Pesanan", icon: ReceiptText },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="flex shrink-0 bg-daun text-white md:min-h-screen md:w-60 md:flex-col md:p-5">
      <div className="hidden items-center gap-2 pb-8 md:flex">
        <Store className="h-6 w-6 text-kunyit" />
        <span className="text-lg font-bold">Toko Kita</span>
      </div>
      <nav className="flex w-full justify-around gap-1 p-2 md:flex-col md:justify-start md:p-0">
        {menu.map(({ href, label, icon: Icon }) => {
          const aktif = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={aktif ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                aktif ? "bg-kunyit text-tinta" : "text-white/80 hover:bg-daun-dark"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
