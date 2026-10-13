# Satelyd Frontend (satelyd-fe)

Aplikasi Web Frontend untuk platform **Satelyd** berbasis **Next.js (App Router)**, **React 19**, dan **Tailwind CSS**.

---

## 1. Persyaratan Sistem

- **Node.js**: v20.x atau v22.x LTS
- **npm**: v10+

---

## 2. Langkah Instalasi

1. **Masuk ke direktori frontend**:
   ```bash
   cd satelyd-fe
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**:
   Salin file contoh konfigurasi:
   ```bash
   cp .env.example .env.local
   ```
   Pastikan `NEXT_PUBLIC_API_URL` mengarah ke URL backend Anda (misal `http://localhost:4000` untuk lokal atau domain backend di production).

---

## 3. Build Proyek

Untuk membuat production build Next.js yang teroptimasi:

```bash
npm run build
```

---

## 4. Cara Menjalankan Aplikasi

### Mode Development
```bash
npm run dev
```
Aplikasi dapat diakses di browser pada `http://localhost:3000`.

### Mode Production
Setelah proses build selesai (`npm run build`):
```bash
npm run start
```
Aplikasi production Next.js akan berjalan di port `3000` (atau port dari environment variable `PORT`).
