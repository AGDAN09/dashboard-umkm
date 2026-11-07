import { NAMA_TOKO, type Pesanan } from "./data";
import { rupiah, tanggal } from "./format";

// 0812... atau 812... diubah jadi format internasional 62812...
export function nomorWA(telepon?: string) {
  if (!telepon) return "";
  let n = telepon.replace(/\D/g, "");
  if (n.startsWith("0")) n = "62" + n.slice(1);
  else if (n.startsWith("8")) n = "62" + n;
  return n;
}

export function linkNota(p: Pesanan) {
  const baris = [`*Nota ${p.id}*`, NAMA_TOKO, tanggal(p.tanggal), "", `Pelanggan: ${p.pelanggan}`];

  if (p.items && p.items.length > 0) {
    baris.push("", ...p.items.map((i) => `${i.qty} x ${i.nama} = ${rupiah(i.harga * i.qty)}`));
  }

  baris.push("", `*Total: ${rupiah(p.total)}*`, `Status: ${p.status}`, "", "Terima kasih sudah berbelanja!");

  return `https://wa.me/${nomorWA(p.telepon)}?text=${encodeURIComponent(baris.join("\n"))}`;
}