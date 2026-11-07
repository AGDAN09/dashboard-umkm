"use client";

import { AlertTriangle, Package, ShoppingBag, Wallet } from "lucide-react";
import { pesananAwal, produkAwal, STOK_MENIPIS, type Pesanan, type Produk } from "@/lib/data";
import { rupiah, tanggal } from "@/lib/format";
import { useLocalStorage } from "@/lib/uselocalstorage";

export default function Ringkasan() {
  const [pesanan] = useLocalStorage<Pesanan[]>("umkm:pesanan", pesananAwal);
  const [produk] = useLocalStorage<Produk[]>("umkm:produk", produkAwal);

  const omzet = pesanan.filter((p) => p.status === "Selesai").reduce((a, p) => a + p.total, 0);
  const baru = pesanan.filter((p) => p.status === "Baru").length;
  const menipis = produk.filter((p) => p.stok <= STOK_MENIPIS);

  const stat = [
    { label: "Omzet selesai", nilai: rupiah(omzet), icon: Wallet },
    { label: "Pesanan baru", nilai: String(baru), icon: ShoppingBag },
    { label: "Total produk", nilai: String(produk.length), icon: Package },
    { label: "Stok menipis", nilai: String(menipis.length), icon: AlertTriangle },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">Selamat datang kembali</h1>
      <p className="mt-1 text-tinta/60">Kondisi tokomu hari ini.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stat.map(({ label, nilai, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-tinta/10 bg-white p-4">
            <Icon className="h-5 w-5 text-daun" />
            <p className="mt-3 text-xl font-bold">{nilai}</p>
            <p className="text-sm text-tinta/60">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <section className="rounded-xl border border-tinta/10 bg-white p-5 lg:col-span-3">
          <h2 className="font-semibold">Pesanan terbaru</h2>
          <ul className="mt-3 divide-y divide-tinta/10">
            {pesanan.slice(0, 4).map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium">{p.pelanggan}</p>
                  <p className="text-tinta/60">{p.id} · {tanggal(p.tanggal)}</p>
                </div>
                <span className="font-semibold">{rupiah(p.total)}</span>
              </li>
            ))}
            {pesanan.length === 0 && (
              <li className="py-6 text-center text-sm text-tinta/60">Belum ada pesanan. Buat pesanan pertama di halaman Pesanan.</li>
            )}
          </ul>
        </section>

        <section className="rounded-xl border border-bata/30 bg-bata-soft p-5 lg:col-span-2">
          <h2 className="font-semibold text-bata">Perlu restok</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {menipis.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.nama}</span>
                <span className="font-semibold">sisa {p.stok}</span>
              </li>
            ))}
            {menipis.length === 0 && <li className="text-tinta/60">Semua stok aman.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}