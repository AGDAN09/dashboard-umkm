"use client";

import { useMemo, useState } from "react";
import { Minus, Pencil, Plus, Save, Search, Trash2, X } from "lucide-react";
import { produkAwal, STOK_MENIPIS, type Produk } from "@/lib/data";
import { rupiah } from "@/lib/format";
import { useLocalStorage } from "@/lib/uselocalstorage";

const KATEGORI = ["Makanan", "Minuman", "Fashion", "Kerajinan", "Lainnya"];
const kosong = { nama: "", kategori: "Makanan", harga: "", stok: "" };

export default function ProdukTable() {
  const [items, setItems] = useLocalStorage<Produk[]>("umkm:produk", produkAwal);
  const [cari, setCari] = useState("");
  const [form, setForm] = useState(kosong);
  const [editId, setEditId] = useState<number | null>(null);

  const tampil = useMemo(
    () => items.filter((p) => p.nama.toLowerCase().includes(cari.toLowerCase())),
    [items, cari]
  );

  const ubahStok = (id: number, d: number) =>
    setItems((l) => l.map((p) => (p.id === id ? { ...p, stok: Math.max(0, p.stok + d) } : p)));

  const batal = () => {
    setEditId(null);
    setForm(kosong);
  };

  const mulaiEdit = (p: Produk) => {
    setEditId(p.id);
    setForm({ nama: p.nama, kategori: p.kategori, harga: String(p.harga), stok: String(p.stok) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const simpan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || Number(form.harga) <= 0) return;
    const data = {
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      stok: Number(form.stok) || 0,
    };
    if (editId !== null) {
      setItems((l) => l.map((p) => (p.id === editId ? { ...p, ...data } : p)));
    } else {
      setItems((l) => [{ id: Date.now(), ...data }, ...l]);
    }
    batal();
  };

  const hapus = (p: Produk) => {
    if (!confirm(`Hapus "${p.nama}"?`)) return;
    setItems((l) => l.filter((x) => x.id !== p.id));
    if (editId === p.id) batal();
  };

  const input = "rounded-lg border border-tinta/20 bg-white px-3 py-2 text-sm";

  return (
    <>
      <form
        onSubmit={simpan}
        className={`mt-6 grid gap-3 rounded-xl border bg-white p-4 sm:grid-cols-6 ${
          editId !== null ? "border-kunyit" : "border-tinta/10"
        }`}
      >
        {editId !== null && (
          <p className="text-sm font-semibold sm:col-span-6">Mengedit produk</p>
        )}
        <input className={`${input} sm:col-span-2`} placeholder="Nama produk" value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })} aria-label="Nama produk" />
        <select className={input} value={form.kategori}
          onChange={(e) => setForm({ ...form, kategori: e.target.value })} aria-label="Kategori">
          {KATEGORI.map((k) => <option key={k}>{k}</option>)}
        </select>
        <input className={input} type="number" min={1} placeholder="Harga (Rp)" value={form.harga}
          onChange={(e) => setForm({ ...form, harga: e.target.value })} aria-label="Harga" />
        <input className={input} type="number" min={0} placeholder="Stok" value={form.stok}
          onChange={(e) => setForm({ ...form, stok: e.target.value })} aria-label="Stok" />
        <div className="flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-daun px-4 py-2 text-sm font-semibold text-white hover:bg-daun-dark">
            {editId !== null ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {editId !== null ? "Simpan" : "Tambah"}
          </button>
          {editId !== null && (
            <button type="button" onClick={batal} aria-label="Batal edit"
              className="rounded-lg border border-tinta/20 px-3 hover:bg-kertas">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
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
              <th className="p-3"><span className="sr-only">Aksi</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tinta/10">
            {tampil.map((p) => (
              <tr key={p.id} className={editId === p.id ? "bg-kunyit-soft" : ""}>
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
                <td className="p-3 text-right whitespace-nowrap">
                  <button onClick={() => mulaiEdit(p)} aria-label={`Edit ${p.nama}`} className="rounded p-1.5 text-daun hover:bg-daun-soft"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => hapus(p)} aria-label={`Hapus ${p.nama}`} className="rounded p-1.5 text-bata hover:bg-bata-soft"><Trash2 className="h-4 w-4" /></button>
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