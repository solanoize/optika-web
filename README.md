# Optika Web

Aplikasi web yang dibuat untuk membantu manajemen optik. Ini adalah bagian _frontend_ dari optika project. Untuk _backend_ (API), Anda dapat menemukan repositori `optika-api` di akun GitHub kami. Aplikasi ini mencakup fitur untuk mengelola data pelanggan, produk, transaksi order, incoming goods dan stocke movement pada sebuah toko (dalam kasus ini adalah toko Optik).

## Teknologi yang Digunakan

- **React**: Library JavaScript untuk membangun antarmuka pengguna.
- **Vite**: Build tool modern yang memberikan pengalaman pengembangan yang cepat.
- **React Bootstrap**: Komponen UI frontend yang dibuat dengan Bootstrap.
- **React Router**: Untuk routing dan navigasi di dalam aplikasi.
- **SweetAlert2**: Untuk menampilkan notifikasi dan pesan yang interaktif.

## Struktur Proyek

Struktur folder utama dalam direktori `src`:

- `assets`: Menyimpan file statis seperti gambar dan ikon.
- `component`: Berisi komponen-komponen React yang dapat digunakan kembali, diorganisir berdasarkan fitur (e.g., `product`, `customer`, `common`).
- `constant`: Menyimpan nilai-nilai konstan yang digunakan di seluruh aplikasi.
- `context`: Berisi React Context untuk state management global, seperti status autentikasi.
- `exception`: Berisi class exception kustom untuk penanganan error.
- `hook`: Berisi custom hooks React.
- `page`: Komponen yang mewakili halaman-halaman utama aplikasi.
- `provider`: Berisi komponen Provider untuk React Context.
- `service`: Berisi fungsi-fungsi untuk berinteraksi dengan API backend.

## Memulai

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda.

### Prasyarat

Pastikan Anda telah menginstal perangkat lunak berikut:

- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- [npm](https://www.npmjs.com/) (biasanya terinstal bersama Node.js)

### Instalasi

1.  Clone repositori ini (jika ada) atau cukup navigasi ke direktori proyek.
2.  Instal semua dependensi yang diperlukan dengan menjalankan perintah berikut:

    ```bash
    npm install
    ```

### Konfigurasi Lingkungan

Proyek ini memerlukan beberapa variabel lingkungan untuk berjalan dengan benar, terutama untuk terhubung ke backend API. Variabel ini disimpan dalam file `.env.local`.

File ini tidak termasuk dalam repositori Git demi keamanan. Untuk mengaturnya:

1.  Buat file baru di direktori utama proyek dengan nama `.env.local`.
2.  Salin konten dari contoh di bawah ini ke dalam file `.env.local` Anda, dan sesuaikan nilainya dengan konfigurasi lokal Anda.

    ```env
    # URL dasar untuk API backend
    VITE_API_BASE_URL=http://localhost:8080/api/v1
    ```

    **Penting:** Nama variabel harus diawali dengan `VITE_` agar dapat diakses oleh aplikasi frontend, sesuai dengan aturan dari Vite.

### Menjalankan Aplikasi

Untuk menjalankan aplikasi dalam mode pengembangan, gunakan perintah:

```bash
npm run dev
```

Aplikasi akan berjalan di port yang tersedia, biasanya dimulai dari `http://localhost:5173`.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.

---

### MIT License

Copyright (c) 2025 Alasware

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
