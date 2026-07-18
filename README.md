# Kalkulator Skrining Stunting Anak

Next.js App Router project untuk skrining awal pertumbuhan anak usia 0-60 bulan. UI memakai Tailwind CSS dan AI advice dipanggil lewat server-side API route agar API key tidak pernah diekspos ke frontend.

## Jalankan Lokal

1. Salin `.env.example` menjadi `.env.local`
2. Isi `GEMINI_API_KEY` dan opsional `GEMINI_API_KEY_2`
3. Jalankan:

```bash
npm install
npm run dev
```

## Deploy ke Vercel

1. Push repository ke GitHub
2. Import ke Vercel
3. Tambahkan environment variable:

```bash
GEMINI_API_KEY=your_api_key_here
GEMINI_API_KEY_2=your_second_key_here
```

4. Deploy

## Catatan

- Ini hanya skrining awal, bukan diagnosis medis.
- Referensi: Permenkes No. 2 Tahun 2020.