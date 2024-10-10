
# WebStock - Jual Beli Stock

**WebStock** adalah platform digital yang memudahkan pengguna dalam melakukan jual beli saham secara online. Dengan antarmuka yang ramah pengguna dan fitur-fitur yang efektif, WebStock memberikan pengalaman yang aman, cepat, dan efisien bagi para investor serta trader untuk mengelola portofolio mereka. WebStock menyediakan data pasar saham secara real-time, memungkinkan pengguna untuk membeli, menjual, dan memantau saham dengan mudah.

## Fitur Utama

1. **Dashboard Pengguna**:
   - Menyediakan ringkasan portofolio saham pengguna, termasuk informasi mengenai saham yang dimiliki dan performanya secara real-time.
   - Memperbarui nilai pasar saham dan menunjukkan keuntungan atau kerugian total.

2. **Pembelian dan Penjualan Saham**:
   - Fasilitas untuk membeli dan menjual saham langsung dari dashboard dengan antarmuka yang sederhana.
   - Transaksi dilakukan dengan cepat dan aman melalui berbagai metode pembayaran yang tersedia.

3. **Analisis & Data Pasar**:
   - Visualisasi performa saham dalam bentuk grafik harian, mingguan, atau bulanan.
   - Data pasar saham yang diperbarui secara real-time, memberikan informasi harga terkini, volume perdagangan, dan tren saham.

4. **Keamanan & Otentikasi**:
   - Sistem keamanan yang canggih dengan enkripsi untuk melindungi data pengguna.
   - Otentikasi dua faktor (2FA) tersedia untuk memberikan keamanan tambahan bagi akun pengguna.

## Teknologi yang Digunakan

- **Frontend**:
  - Dibangun menggunakan React.js untuk menciptakan antarmuka pengguna yang dinamis.
  - Memanfaatkan Chart.js atau D3.js untuk menampilkan grafik performa saham.

- **Backend**:
  - Node.js dengan Express sebagai API server-side.
  - PostgreSQL untuk manajemen database, termasuk penyimpanan data saham, transaksi, dan pengguna.

- **Real-Time Data**:
  - Menggunakan WebSocket untuk memperbarui harga saham secara langsung.

- **Keamanan**:
  - Autentikasi pengguna menggunakan JWT (JSON Web Token).
  - SSL Encryption untuk melindungi data pengguna dan transaksi.

## Cara Kerja

1. **Pendaftaran**:
   Pengguna dapat mendaftar dengan email dan melakukan verifikasi akun. Setelah verifikasi, pengguna dapat langsung masuk dan mulai menjelajahi platform.

2. **Deposit dan Penarikan**:
   Pengguna bisa melakukan deposit dana melalui berbagai metode pembayaran, yang kemudian dapat digunakan untuk membeli saham di platform.

3. **Transaksi Saham**:
   Saham dari berbagai perusahaan dapat dibeli dan dijual dengan mudah. Setelah membeli, saham akan langsung muncul di portofolio pengguna, di mana mereka bisa memantau perubahan nilai saham.

## Kelebihan WebStock

- **Data Pasar Real-Time**: Informasi harga saham yang selalu diperbarui, memastikan pengguna mendapatkan data terkini saat melakukan transaksi.
- **Antarmuka Sederhana**: Desain yang intuitif dan mudah digunakan, cocok untuk investor pemula maupun berpengalaman.
- **Keamanan Terjamin**: Platform menggunakan protokol keamanan tinggi untuk melindungi data pengguna dan transaksi.
- **Transaksi Cepat**: Proses jual beli saham yang cepat dan mudah dengan dukungan berbagai metode pembayaran.

## Instalasi dan Penggunaan

1. Clone repository ke komputer lokal Anda:
   ```bash
   git clone https://github.com/your-repo-url
   ```

2. Masuk ke direktori proyek:
   ```bash
   cd webstock
   ```

3. Instal dependencies frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Instal dependencies backend:
   ```bash
   cd server
   npm install
   npm start
   ```

5. Akses aplikasi melalui browser di `http://localhost:3000`.

---

## Hubungi Kami
