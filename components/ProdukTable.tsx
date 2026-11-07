"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Search, Trash2 } from "lucide-react";
import { produkAwal, STOK_MENIPIS, type Produk } from "@/lib/data";
import { rupiah } from "@/lib/format";

const kosong = { nama: "", kategori: "Makanan", harga: "", stok: "" };

export default function ProdukTable() {
  const [items, setItems] = useState<Produk[]>(produkAwal);
  const [cari, setCari] = useState("");
  const [form, setForm] = useState(kosong);

  const tampil = useMemo(
    () => items.filter((p) => p.nama.toLowerCase().includes(cari.toLowerCase())),
    [items, cari]
  );

  const ubahStok = (id: number, d: number) =>
    setItems((l) => l.map((p) => (p.id === id ? { ...p, stok: Math.max(0, p.stok + d) } : p)));

  const tambah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || Number(form.harga) <= 0) return;
    setItems((l) => [
      { id: Date.now(), nama: form.nama.trim(), kategori: form.kategori, harga: Number(form.harga), stok: Number(form.stok) || 0 },
      ...l,
    ]);
    setForm(kosong);
  };

  const input = "rounded-lg border border-tinta/20 bg-white px-3 py-2 text-sm";

  return (
    <>
      <form onSubmit={tambah} className="mt-6 grid gap-3 rounded-xl border border-tinta/10 bg-white p-4 sm:grid-cols-5">
        <input className={`${input} sm:col-span-2`} placeholder="Nama produk" value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })} aria-label="Nama produk" />
        <input className={input} type="number" min={1} placeholder="Harga (Rp)" value={form.harga}
          onChange={(e) => setForm({ ...form, harga: e.target.value })} aria-label="Harga" />
        <input className={input} type="number" min={0} placeholder="Stok" value={form.stok}
          onChange={(e) => setForm({ ...form, stok: e.target.value })} aria-label="Stok" />
        <button className="flex items-center justify-center gap-2 rounded-lg bg-daun px-4 py-2 text-sm font-semibold text-white hover:bg-daun-dark">
          <Plus className="h-4 w-4" /> Tambah produk
        </button>
      </form>

      <div className="relative mt-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-tinta/40" />
        <input className={`${input} w-full pl-9 sm:w-72`} placeholder="Cari produk" value={cari}
          onChange={(e) => setCari(e.target.value)} aria-label="Cari produk" />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-tinta/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-daun-soft text-daun">
            <tr>
              <th className="p-3 font-semibold">Produk</th>
              <th className="p-3 font-semibold">Harga</th>
              <th className="p-3 font-semibold">Stok</th>
              <th className="p-3"><span className="sr-only">Hapus</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tinta/10">
            {tampil.map((p) => (
              <tr key={p.id}>
                <td className="p-3">
                  <p className="font-medium">{p.nama}</p>
                  <p className="text-tinta/60">{p.kategori}</p>
                </td>
                <td className="p-3">{rupiah(p.harga)}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => ubahStok(p.id, -1)} aria-label={`Kurangi stok ${p.nama}`} className="rounded border border-tinta/20 p-1 hover:bg-kertas"><Minus className="h-3.5 w-3.5" /></button>
                    <span className={`min-w-8 text-center font-semibold ${p.stok <= STOK_MENIPIS ? "text-bata" : ""}`}>{p.stok}</span>
                    <button onClick={() => ubahStok(p.id, 1)} aria-label={`Tambah stok ${p.nama}`} className="rounded border border-tinta/20 p-1 hover:bg-kertas"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => setItems((l) => l.filter((x) => x.id !== p.id))} aria-label={`Hapus ${p.nama}`} className="rounded p-1.5 text-bata hover:bg-bata-soft"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {tampil.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-tinta/60">Belum ada produk yang cocok. Coba kata kunci lain atau tambah produk baru.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
