# Romantic Digital Gift 💌

Website romantis interaktif — hadiah digital pribadi untuk pacar/seseorang spesial.

## Struktur Folder

```
romantic-gift/
├── index.html          # Halaman utama
├── style.css           # Styling & animasi
├── script.js           # Logika & KONFIGURASI (edit di sini!)
├── README.md
└── assets/
    ├── photos/         # Foto kenangan (photo1.jpg - photo6.jpg)
    ├── music/          # Lagu latar (our-song.mp3)
    └── images/         # Placeholder SVG (otomatis jika foto belum ada)
```

---

## Cara Menjalankan

### Lokal (paling mudah)

1. Buka folder `romantic-gift`
2. Double-click `index.html`, atau
3. Gunakan Live Server di VS Code / Cursor

### Dengan Python (opsional)

```bash
cd romantic-gift
python -m http.server 8080
```

Buka `http://localhost:8080` di browser.

---

## Personalisasi — Edit `script.js`

Semua data pribadi ada di bagian **`CONFIG`** di awal file `script.js`.

### 1. Nama Pacar

```javascript
partnerName: "NAMA PACAR",
yourName: "Aku",
```

### 2. Secret Code

```javascript
secretCode: "123456",
```

Ganti dengan kode yang hanya kalian berdua tahu (tanggal jadian, nickname, dll).

### 3. Surat Cinta

```javascript
letter: {
  greeting: "Dear",
  paragraphs: [
    "Paragraf pertama...",
    "Paragraf kedua...",
  ],
  closing: "Thank you for being you. ❤️",
  signature: "With love,",
},
```

### 4. Foto Kenangan

1. Siapkan 6 foto (format JPG/PNG)
2. Rename menjadi: `photo1.jpg`, `photo2.jpg`, ... `photo6.jpg`
3. Taruh di folder `assets/photos/`
4. Edit caption di CONFIG:

```javascript
photos: [
  { src: "assets/photos/photo1.jpg", caption: "Our first memory ❤️", alt: "..." },
  // ...
],
```

> Jika foto belum ada, website otomatis menampilkan placeholder cantik.

### 5. Musik Latar

1. Siapkan file MP3 (lagu spesial kalian)
2. Rename menjadi `our-song.mp3`
3. Taruh di `assets/music/our-song.mp3`

Musik mulai saat tombol **START** ditekan (browser memblokir autoplay). Toggle ON/OFF ada di pojok kanan atas.

### 6. Tanggal & Occasion

```javascript
occasion: "ANNIVERSARY", // ANNIVERSARY | BIRTHDAY | JUST BECAUSE
occasionLabel: "Happy Anniversary ❤️",
anniversaryDate: "20 August 2024",
```

### 7. Pesan Final

```javascript
finalSurprise: {
  line1: "If I could choose again...",
  line2: "I'd still choose you.",
  line3: "Every single time. ❤️",
  line4: "Thank you for being part of my life.",
},
```

---

## Alur Website

```
START → Secret Code → Amplop → Bunga → Surat → Galeri → Stats → Interaksi → Surprise → Ending
```

---

## Deploy — Dapatkan Link Publik

### GitHub Pages (Recommended)

1. **Buat repository GitHub**
   - Buka [github.com/new](https://github.com/new)
   - Nama: `romantic-gift` (atau bebas)
   - Public atau Private (Private tetap bisa Pages)

2. **Upload project**

   ```bash
   cd romantic-gift
   git add .
   git commit -m "Romantic digital gift for my love"
   git branch -M main
   git remote add origin https://github.com/USERNAME/romantic-gift.git
   git push -u origin main
   ```

3. **Aktifkan GitHub Pages**
   - Repo → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` → folder `/ (root)` → **Save**

4. **Dapatkan URL**
   - `https://USERNAME.github.io/romantic-gift/`
   - Tunggu 1–3 menit, lalu buka link tersebut

5. **Custom domain (opsional)**
   - Settings → Pages → Custom domain
   - Tambahkan CNAME di DNS provider

---

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Di folder project:

   ```bash
   cd romantic-gift
   vercel
   ```

3. Ikuti prompt (pilih default)
4. URL: `https://romantic-gift-xxx.vercel.app`

Atau drag & drop folder ke [vercel.com/new](https://vercel.com/new).

---

### Netlify

1. Buka [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag folder `romantic-gift` ke halaman
3. URL langsung tersedia: `https://random-name.netlify.app`

Atau connect ke GitHub repo untuk auto-deploy.

---

## Kirim ke Pacar

1. Deploy website (salah satu metode di atas)
2. Copy URL publik
3. Kirim via WhatsApp dengan pesan romantis, contoh:

   > "Hey babe, aku buat sesuatu buat kamu. Buka link ini ya 💌 [URL]"

---

## Tips

- **Test di HP** sebelum dikirim — website didesain mobile-first
- **Ganti secret code** ke sesuatu yang meaningful
- **Compress foto** (< 500KB per foto) agar loading cepat
- **Compress MP3** jika file terlalu besar
- Jangan commit file `.env` atau data sensitif

---

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Playfair Display + Poppins)
- No framework — ringan & cepat

---

Made with love, just for you. ❤️
