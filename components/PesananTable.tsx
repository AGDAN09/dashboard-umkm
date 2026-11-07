"use client";

import { useState } from "react";
import { Plus, ShoppingCart, X } from "lucide-react";
import {
  pesananAwal, produkAwal, STATUS,
  type ItemPesanan, type Pesanan, type Produk, type StatusPesanan,
} from "@/lib/data";
import { rupiah, tanggal } from "@/lib/format";
import { useLocalStorage } from "@/lib/uselocalstorage";

const warna: Record<StatusPesanan, string> = {
  Baru: "bg-yellow-100 text-yellow-800",
  Diproses: "bg-bata-soft text-bata",
  Dikirim: "bg-sky-200 text-sky-900",
  Selesai: "bg-green-100 text-green-800",
};

export default function PesananTable() {
  const [items, setItems] = useLocalStorage<Pesanan[]>("umkm:pesanan", pesananAwal);
  const [produk, setProduk] = useLocalStorage<Produk[]>("umkm:produk", produkAwal);
  const [filter, setFilter] = useState<StatusPesanan | "Semua">("Semua");

  const [buka, setBuka] = useState(false);
  const [pelanggan, setPelanggan] = useState("");
  const [pilih, setPilih] = useState("");
  const [qty, setQty] = useState("1");
  const [keranjang, setKeranjang] = useState<ItemPesanan[]>([]);
  const [pesan, setPesan] = useState("");

  const tampil = filter === "Semua" ? items : items.filter((p) => p.status === filter);
  const ubah = (id: string, status: StatusPesanan) =>
    setItems((l) => l.map((p) => (p.id === id ? { ...p, status } : p)));

  const dipakai = (id: number) => keranjang.find((k) => k.produkId === id)?.qty ?? 0;
  const tersedia = produk.filter((p) => p.stok - dipakai(p.id) > 0);
  const total = keranjang.reduce((a, k) => a + k.harga * k.qty, 0);

  const tambahItem = () => {
    const p = produk.find((x) => x.id === Number(pilih));
    const n = Math.floor(Number(qty));
    if (!p || n < 1) return;
    const sisa = p.stok - dipakai(p.id);
    if (n > sisa) {
      setPesan(`Stok ${p.nama} tinggal ${sisa}.`);
      return;
    }
    setPesan("");
    setKeranjang((k) =>
      k.some((i) => i.produkId === p.id)
        ? k.map((i) => (i.produkId === p.id ? { ...i, qty: i.qty + n } : i))
        : [...k, { produkId: p.id, nama: p.nama, harga: p.harga, qty: n }]
    );
    setQty("1");
  };

  const tutup = () => {
    setBuka(false);
    setPelanggan("");
    setPilih("");
    setQty("1");
    setKeranjang([]);
    setPesan("");
  };

  const simpan = () => {
    if (!pelanggan.trim() || keranjang.length === 0) return;
    const nomor = Math.max(1000, ...items.map((p) => Number(p.id.replace("INV-", "")) || 0)) + 1;
    setItems((l) => [
      {
        id: `INV-${nomor}`,
        pelanggan: pelanggan.trim(),
        total,
        status: "Baru",
        tanggal: new Date().toLocaleDateString("sv-SE"),
        items: keranjang,
      },
      ...l,
    ]);
    setProduk((l) =>
      l.map((p) => {
        const k = keranjang.find((i) => i.produkId === p.id);
        return k ? { ...p, stok: p.stok - k.qty } : p;
      })
    );
    tutup();
  };

  const input = "rounded-lg border border-tinta/20 bg-white px-3 py-2 text-sm";

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {(["Semua", ...STATUS] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} aria-pressed={filter === s}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${filter === s ? "bg-daun text-white" : "bg-white border border-tinta/20 hover:bg-kertas"}`}>
            {s}
          </button>
        ))}
        <button onClick={() => (buka ? tutup() : setBuka(true))}
          className="ml-auto flex items-center gap-2 rounded-lg bg-daun px-4 py-2 text-sm font-semibold text-white hover:bg-daun-dark">
          <Plus className="h-4 w-4" /> Pesanan baru
        </button>
      </div>

      {buka && (
        <section className="mt-4 rounded-xl border border-kunyit bg-white p-4">
          <h2 className="font-semibold">Pesanan baru</h2>
          <input className={`${input} mt-3 w-full sm:w-80`} placeholder="Nama pelanggan" value={pelanggan}
            onChange={(e) => setPelanggan(e.target.value)} aria-label="Nama pelanggan" />

          <div className="mt-3 flex flex-wrap gap-2">
            <select className={`${input} min-w-56`} value={pilih} onChange={(e) => setPilih(e.target.value)} aria-label="Pilih produk">
              <option value="">Pilih produk</option>
              {tersedia.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nama} (stok {p.stok - dipakai(p.id)})
                </option>
              ))}
            </select>
            <input className={`${input} w-20`} type="number" min={1} value={qty}
              onChange={(e) => setQty(e.target.value)} aria-label="Jumlah" />
            <button type="button" onClick={tambahItem}
              className="flex items-center gap-2 rounded-lg border border-daun px-4 py-2 text-sm font-semibold text-daun hover:bg-daun-soft">
              <ShoppingCart className="h-4 w-4" /> Tambahkan
            </button>
          </div>
          {pesan && <p className="mt-2 text-sm text-bata">{pesan}</p>}

          {keranjang.length > 0 && (
            <ul className="mt-4 divide-y divide-tinta/10 text-sm">
              {keranjang.map((k) => (
                <li key={k.produkId} className="flex items-center justify-between py-2">
                  <span>{k.qty} × {k.nama}</span>
                  <span className="flex items-center gap-3">
                    {rupiah(k.harga * k.qty)}
                    <button onClick={() => setKeranjang((l) => l.filter((i) => i.produkId !== k.produkId))}
                      aria-label={`Hapus ${k.nama} dari pesanan`} className="rounded p-1 text-bata hover:bg-bata-soft">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-center justify-between">
            <p className="font-semibold">Total: {rupiah(total)}</p>
            <button onClick={simpan} disabled={!pelanggan.trim() || keranjang.length === 0}
              className="rounded-lg bg-daun px-4 py-2 text-sm font-semibold text-white hover:bg-daun-dark disabled:opacity-40">
              Simpan pesanan
            </button>
          </div>
        </section>
      )}

      <div className="mt-4 overflow-x-auto rounded-xl border border-tinta/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-daun-soft text-daun">
            <tr>
              <th className="p-3 font-semibold">Pesanan</th>
              <th className="p-3 font-semibold">Total</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tinta/10">
            {tampil.map((p) => (
              <tr key={p.id}>
                <td className="p-3">
                  <p className="font-medium">{p.pelanggan}</p>
                  <p className="text-tinta/60">{p.id} · {tanggal(p.tanggal)}</p>
                  {p.items && p.items.length > 0 && (
                    <p className="text-tinta/60">{p.items.map((i) => `${i.qty}× ${i.nama}`).join(", ")}</p>
                  )}
                </td>
                <td className="p-3 font-semibold">{rupiah(p.total)}</td>
                <td className="p-3">
                  <select value={p.status} onChange={(e) => ubah(p.id, e.target.value as StatusPesanan)}
                    aria-label={`Status ${p.id}`}
                    className={`rounded-full border-0 px-3 py-1.5 text-sm font-medium ${warna[p.status]}`}>
                    {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {tampil.length === 0 && (
              <tr><td colSpan={3} className="p-8 text-center text-tinta/60">Tidak ada pesanan dengan status ini.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}