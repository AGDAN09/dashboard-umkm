import ProdukTable from "@/components/ProdukTable";

export default function Produk() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">Produk</h1>
      <p className="mt-1 text-tinta/60">Kelola daftar barang dan stoknya.</p>
      <ProdukTable />
    </div>
  );
}
