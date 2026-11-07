import PesananTable from "@/components/PesananTable";

export default function Pesanan() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">Pesanan</h1>
      <p className="mt-1 text-tinta/60">Pantau dan perbarui status pesanan.</p>
      <PesananTable />
    </div>
  );
}
