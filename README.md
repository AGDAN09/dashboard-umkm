# Dashboard UMKM

Dashboard admin sederhana untuk membantu pemilik usaha kecil mengelola produk, stok, dan pesanan. Tampilannya responsif: sidebar di desktop, menu bawah di HP.

**Demo:** https://dashboard-umkm-agdan.vercel.app/

## Fitur

**Ringkasan**
- Omzet dari pesanan selesai, jumlah pesanan baru, total produk, dan stok menipis
- Daftar pesanan terbaru dan produk yang perlu direstok
- Angka ikut berubah sesuai data yang diinput

**Produk**
- Tambah, edit (nama, kategori, harga, stok), dan hapus produk dengan konfirmasi
- Cari produk berdasarkan nama
- Ubah stok cepat dengan tombol plus dan minus
- Penanda merah untuk stok menipis (10 atau kurang)

**Pesanan**
- Buat pesanan baru: pilih pelanggan, produk, dan jumlah, total dihitung otomatis
- Stok produk berkurang otomatis saat pesanan disimpan, dengan validasi agar tidak melebihi stok
- Filter berdasarkan status (Baru, Diproses, Dikirim, Selesai) dan ubah status lewat dropdown
- Kirim nota ke pelanggan lewat WhatsApp dengan satu klik

**Umum**
- Data tersimpan otomatis di localStorage, jadi tidak hilang saat halaman di-refresh
- Format rupiah dan tanggal Indonesia

## Teknologi

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React

## Struktur Project

    app/          halaman (ringkasan, produk, pesanan)
    components/   Sidebar, ProdukTable, PesananTable
    lib/          data contoh, format rupiah dan tanggal, hook localStorage, link WhatsApp

## Menjalankan di Lokal

    npm install
    npm run dev

Buka http://localhost:3000

## Catatan

Data disimpan di browser masing-masing pengguna (localStorage), belum memakai database. Pesanan yang dibuat di satu browser tidak terlihat di browser lain.

## Rencana Pengembangan

- [x] Simpan data ke localStorage
- [x] Edit produk
- [x] Buat pesanan baru
- [x] Kirim nota via WhatsApp
- [ ] Batalkan pesanan dan kembalikan stok
- [ ] Grafik omzet 7 hari terakhir
- [ ] Pagination dan sorting tabel
- [ ] Database dan login admin
