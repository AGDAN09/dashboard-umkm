export type Produk = { id: number; nama: string; kategori: string; harga: number; stok: number };
export type StatusPesanan = "Baru" | "Diproses" | "Dikirim" | "Selesai";
export type Pesanan = { id: string; pelanggan: string; total: number; status: StatusPesanan; tanggal: string };

export const STOK_MENIPIS = 10;
export const STATUS: StatusPesanan[] = ["Baru", "Diproses", "Dikirim", "Selesai"];

export const produkAwal: Produk[] = [
  { id: 1, nama: "Keripik Tempe Original", kategori: "Makanan", harga: 18000, stok: 54 },
  { id: 2, nama: "Sambal Bawang 250 ml", kategori: "Makanan", harga: 32000, stok: 8 },
  { id: 3, nama: "Kopi Arabika Malang 200 g", kategori: "Minuman", harga: 65000, stok: 23 },
  { id: 4, nama: "Batik Tulis Sarung", kategori: "Fashion", harga: 210000, stok: 5 },
  { id: 5, nama: "Tas Anyaman Pandan", kategori: "Kerajinan", harga: 95000, stok: 17 },
  { id: 6, nama: "Madu Hutan 500 ml", kategori: "Minuman", harga: 120000, stok: 31 },
];

export const pesananAwal: Pesanan[] = [
  { id: "INV-1042", pelanggan: "Agdan Wirayudha", total: 118000, status: "Baru", tanggal: "2026-11-07" },
  { id: "INV-1041", pelanggan: "Jokowi", total: 210000, status: "Diproses", tanggal: "2026-11-06" },
  { id: "INV-1040", pelanggan: "Ambatukam", total: 540000, status: "Dikirim", tanggal: "2026-11-06" },
  { id: "INV-1039", pelanggan: "Rusdi", total: 65000, status: "Selesai", tanggal: "2026-11-05" },
  { id: "INV-1038", pelanggan: "Om ndutz", total: 285000, status: "Selesai", tanggal: "2026-11-04" },
];
