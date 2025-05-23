

# DOKUMENTASI DEPLOY DAN DB - MIGRATION


-------------------------------------------------------------------------------------------------------
                                              D E P L O Y
-------------------------------------------------------------------------------------------------------------


# Deploy Project React + Vite + TypeScript + Tailwind CSS ke Hostinger.

## Deskripsi
Panduan ini berisi langkah-langkah lengkap untuk mendeploy aplikasi React dengan Vite, TypeScript, Tailwind CSS, dan shadcn-ui ke layanan hosting Hostinger. Panduan dimulai dari pengaturan lokal di Visual Studio Code hingga proses upload file ke Hostinger via cPanel.

## Prasyarat
- Akses ke akun Hostinger (dengan domain aktif).
- Visual Studio Code (VSCode) sudah terinstall.
- Node.js dan npm sudah terinstall (`node -v` & `npm -v` bisa dicek di terminal)
- Proyek React dengan Vite + TypeScript + Tailwind CSS + shadcn-ui sudah tersedia
- FTP Client (opsional), namun kita akan gunakan fitur File Manager di cPanel Hostinger.

## Langkah 1: Persiapan Proyek di VSCode.
1. Buka proyek di VSCode:
   ```bash
   code /path/to/your/project
   ```
2. Install dependencies (jika belum pernah install):
   ```bash
   npm install
   ```
3. Jalankan aplikasi secara lokal (opsional, untuk memastikan tidak ada error):
   ```bash
   npm run dev
   ```
4. Build produksi:
   ```bash
   npm run build
   ```
   Output akan ada di folder `dist/` (default untuk Vite).

## Langkah 2: Periksa Isi Folder dist/
Setelah build selesai, pastikan folder `dist/` memiliki struktur seperti:

```
dist/
├── assets/
├── index.html
└── ...dll
```

Jika tidak ada folder `dist`, maka build gagal. Perbaiki error dan ulangi langkah `npm run build`.

## Langkah 3: Login ke cPanel Hostinger
1. Buka [https://www.hostinger.co.id](https://www.hostinger.co.id) dan login.
2. Pergi ke menu Hosting → pilih paket yang ingin digunakan.
3. Klik tombol **cPanel**.
4. Di dalam cPanel, cari menu **File Manager**.

## Langkah 4: Upload File Hasil Build ke Server
1. Buka File Manager dan navigasi ke folder: `/public_html/` (atau sesuai domain utama).  
   Hapus semua isi folder `/public_html/` jika ingin mengganti seluruh situs.

2. Upload isi folder `dist/`:
   - **Opsi A: ZIP folder dist/** dan upload.
     ```bash
     zip -r dist.zip dist/
     ```
     Upload `dist.zip` ke `/public_html/` dan extract di server.
   - **Opsi B: Upload manual satu per satu**
     - Ekstrak folder `dist/` di lokal.
     - Upload isinya (folder `assets`, file `index.html`, dll) ke `/public_html/`.

## Langkah 5: Atur Routing untuk React Router DOM
Karena menggunakan `react-router-dom`, kamu perlu membuat file `.htaccess` agar routing SPA bekerja dengan benar.

Buat file `.htaccess` di `/public_html/` dengan isi berikut:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Langkah 6: Cek Website di Browser
Buka browser dan akses domain:  
[http://antlia.id](http://antlia.id)

## Troubleshooting Umum

| Masalah                         | Solusi                                                                 |
|---------------------------------|------------------------------------------------------------------------|
| Halaman kosong / tidak muncul   | Periksa apakah file `index.html` dan aset lainnya sudah diupload       |
| Route tidak dikenali            | Pastikan `.htaccess` sudah benar                                       |
| Error saat build                | Perbaiki error di lokal menggunakan `npm run build`                    |
| Tidak bisa akses domain         | Tunggu DNS propagation atau cek pengaturan domain                      |





-------------------------------------------------------------------------------------------------------------
                                              D B - M I G R A T I O N
-------------------------------------------------------------------------------------------------------------





# Dokumentasi Lengkap Database Migration Menggunakan Email Sendiri

Dokumentasi ini menjelaskan langkah-langkah migrasi database dan setup Supabase dengan autentikasi berbasis email.

---

## I. SET UP SUPABASE

1. **Sign Up Supabase**  
   Daftar akun Supabase jika belum memiliki akun:  
   [https://supabase.com/dashboard/sign-up](https://supabase.com/dashboard/sign-up)

2. **Mulai Proyek Baru**  
   Masuk ke:  
   [https://supabase.com/dashboard/new](https://supabase.com/dashboard/new)

3. **Buat Organisasi Baru**  
   - Klik **Create a new organization**
   - Isi form:
     - Nama (bebas)
     - Tipe (pilih sesuai kebutuhan)
     - Plan (opsional)
   - Klik **Create**

4. **Isi Detail Proyek**  
   - Masukkan nama proyek (misalnya: `Database`)
   - Masukkan password database (wajib)
   - Biarkan setting lainnya default

5. Klik **Create a New Project**

6. Setelah proyek selesai dibuat, kamu akan diarahkan ke dashboard proyek tersebut

7. **Buat Tabel `articles`**  
   - Klik menu **SQL Editor**
   - Masukkan dan jalankan query berikut:

   ```sql
   create table public.articles (
     id uuid not null default gen_random_uuid (),
     title text not null,
     slug text not null,
     content text not null,
     excerpt text not null,
     author text not null,
     author_email text null,
     category text null,
     keywords text[] null default '{}'::text[],
     reading_time integer null,
     cover_image text null,
     status text not null default 'draft'::text,
     created_at timestamp with time zone not null default now(),
     updated_at timestamp with time zone not null default now(),
     published_at timestamp with time zone not null default now(),
     images text[] null default '{}'::text[],
     constraint articles_pkey primary key (id),
     constraint articles_slug_key unique (slug)
   ) TABLESPACE pg_default;
   ```

8. Setup Supabase selesai ✅

---

## II. COPY "ID" & "API"

9. Masuk ke **Project Settings > General**  
   - Salin **Project ID**

10. Masuk ke **Project Settings > API**  
    - Salin **Project URL**  
    - Salin **Project API Keys (anon key)**

---

## III. SET UP SOURCE CODE

11. Buka file: `supabase/config.toml`  
    - Tempelkan **Project ID** dari langkah 9

12. Buka file: `src/integrations/supabase/client.ts`  
    - Tempelkan **Project URL** dan **Project API Keys** dari langkah 10

---

## IV. TAMBAH ADMIN UNTUK EDIT ARTIKEL

13. Masuk ke menu **Authentication > Users**  
    - Klik **Add User**
    - Masukkan email dan password untuk user admin
    - Centang **Auto Confirm User**
    - Klik **Create**

---

## Selesai!



