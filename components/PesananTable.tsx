"use client";

import { useState } from "react";
import { pesananAwal, STATUS, type Pesanan, type StatusPesanan } from "@/lib/data";
import { rupiah, tanggal } from "@/lib/format";

const warna: Record<StatusPesanan, string> = {
  Baru: "bg-yellow-100 text-yellow-800",
  Diproses: "bg-bata-soft text-bata",
  Dikirim: "bg-sky-100 text-sky-600",
  Selesai: "bg-green-100 text-green-800",
};

export default function PesananTable() {
  const [items, setItems] = useState<Pesanan[]>(pesananAwal);
  const [filter, setFilter] = useState<StatusPesanan | "Semua">("Semua");

  const tampil = filter === "Semua" ? items : items.filter((p) => p.status === filter);
  const ubah = (id: string, status: StatusPesanan) =>
    setItems((l) => l.map((p) => (p.id === id ? { ...p, status } : p)));

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        {(["Semua", ...STATUS] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} aria-pressed={filter === s}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${filter === s ? "bg-daun text-white" : "bg-white border border-tinta/20 hover:bg-kertas"}`}>
            {s}
          </button>
        ))}
      </div>

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
