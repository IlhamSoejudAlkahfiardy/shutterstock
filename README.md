# ShuttDesc

**Shutterstock Description Generator** — aplikasi web untuk menghasilkan deskripsi dan keyword SEO Shutterstock dari gambar, menggunakan AI (Groq + Llama).

Upload satu gambar, klik generate, lalu salin hasil metadata yang siap dipakai untuk listing stock photo.

---

## Fitur

- Upload gambar via **klik**, **drag & drop**, atau **Ctrl+V (paste)**
- Preview gambar (aspect ratio 16:10) dengan opsi hapus
- Generate deskripsi + 50 keyword SEO via model vision Groq
- Kompresi gambar otomatis sebelum dikirim ke API
- Salin hasil ke clipboard dengan notifikasi toast (Sonner)
- Indikator kuota harian (UI)
- UI Neo Brutalism (Tailwind CSS + shadcn/ui)

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui |
| AI | `@ai-sdk/groq`, Vercel AI SDK |
| Model | `meta-llama/llama-4-scout-17b-16e-instruct` |
| Toast | Sonner |
| Icons | Lucide React |
| Image | `browser-image-compression` |

---

## Cara Kerja

```text
Upload gambar
    │
    ▼
Kompresi (max ~1MB / 1920px)
    │
    ▼
Konversi ke Base64 data URL
    │
    ▼
Kirim ke Groq (vision + prompt SEO)
    │
    ▼
Tampilkan Description + Keywords
```

Prompt SEO ada di `src/assets/prompts.ts`. Output yang diharapkan:

```text
Description:
<deskripsi 200–350 karakter>

Keywords:
keyword1, keyword2, ..., keyword50
```

---

## Getting Started

### Prasyarat

- Node.js 20+ (disarankan)
- API key Groq ([console.groq.com](https://console.groq.com))

### Instalasi

```bash
npm install
```

### Environment Variables

Buat file `.env` di root project:

```env
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here
```

> Jangan commit file `.env`. File ini sudah diabaikan di `.gitignore`.

### Jalankan Development Server

```bash
npm run dev
```

Buka `http://localhost:5173`.

### Build Production

```bash
npm run build
npm run preview
```

---

## Scripts

| Command | Keterangan |
|---------|------------|
| `npm run dev` | Menjalankan Vite dev server |
| `npm run build` | Type-check (`tsc -b`) + build production |
| `npm run preview` | Preview hasil build |
| `npm run lint` | Menjalankan ESLint |

---

## Struktur Project

```text
src/
├── api/                    # Axios instance (siap dipakai)
├── assets/
│   └── prompts.ts          # Prompt SEO Shutterstock
├── components/
│   ├── button/             # GenerateButton
│   ├── header/             # Header aplikasi
│   ├── quota/              # Kartu sisa kuota
│   ├── result/             # ResultCard + copy
│   ├── uploader/           # Upload, preview, placeholder
│   └── ui/                 # Komponen shadcn (button, sonner)
├── constants/
│   └── quota.ts            # Limit kuota harian
├── hooks/
│   └── useImageUpload.ts   # State upload, drag/drop, paste
├── layouts/
│   └── AppLayout.tsx       # Layout + Toaster
├── pages/
│   └── HomePage.tsx        # Halaman utama (satu page)
├── routes/
│   └── AppRoutes.tsx
├── services/
│   └── ai.service.ts       # generateDescription()
├── styles/
│   └── brutalism.css       # Utility class Neo Brutalism
├── types/
│   └── image.ts
├── utils/
│   ├── copyToClipboard.ts
│   └── imageToBase64.ts
├── App.tsx
└── main.tsx
```

---

## Alur UI

Urutan komponen di halaman utama:

1. **Header** — judul & subtitle
2. **Upload Card** — area upload / preview
3. **Generate Button** — generate deskripsi (disabled jika belum ada gambar)
4. **Quota Card** — sisa kuota harian
5. **Result Card** — hasil generate + tombol Copy

---

## Catatan Penting

### API Key di Frontend

Saat ini `VITE_GROQ_API_KEY` dipakai langsung di browser. Cocok untuk development / penggunaan pribadi. Untuk production publik, sebaiknya pindahkan pemanggilan Groq ke backend agar key tidak terekspos.

### Format Gambar

Tipe yang didukung: JPG, JPEG, PNG, WEBP, GIF.

Sebelum dikirim ke model, gambar dikompres ke maksimal ~1MB dan resolusi max 1920px.

### Kuota

Kuota harian saat ini dikelola di sisi UI (`src/constants/quota.ts`). Belum terhubung ke backend/auth.

---

## Lisensi

MIT
