# UAS_Web2_312410058_Wahyupahrudin
# 📦 Sistem Manajemen Inventaris Barang (E-Inventory)

## 📌 Deskripsi Proyek
Sistem Manajemen Inventaris Barang (E-Inventory) adalah aplikasi web berbasis RESTful API yang digunakan untuk mengelola data barang, kategori, dan supplier.

Aplikasi ini menggunakan arsitektur **Decoupled Architecture**, dimana backend menggunakan CodeIgniter 4 sebagai REST API Server dan frontend menggunakan VueJS 3 berbasis CDN dengan konsep Single Page Application (SPA).

---

## ⚙️ Teknologi yang Digunakan
- Backend: CodeIgniter 4 (RESTful API)
- Frontend: VueJS 3 (CDN + SPA)
- Routing: Vue Router
- HTTP Client: Axios
- Database: MySQL / MariaDB
- UI Framework: TailwindCSS
- Authentication: JWT Token

---

## 🗄️ Struktur Database
Relasi tabel terdiri dari:
- tabel `barang`
- tabel `kategori`
- tabel `supplier`

📸 Screenshot skema database:
> (Tambahkan gambar di sini)
>
> 
---

## 🔐 Uji Coba API (401 Unauthorized)

Pengujian dilakukan menggunakan Postman:

- Tanpa token → sistem menolak akses
- Status response: **401 Unauthorized**

📸 Screenshot Postman 401:


---

## 💻 Tampilan Aplikasi

### 1. Halaman Login

### 2. Dashboard Admin

### 3. Form Tambah/Edit Data (Modal)

### 4. Tabel Data (TailwindCSS)

---

## 🚀 Cara Menjalankan Aplikasi

### 🔧 Backend (CodeIgniter 4)
```bash
cd backend-api
php spark serve
http://localhost:8080
🌐 Frontend (Vue CDN SPA)

Jika menggunakan static server:

cd frontend-spa
npx serve .
🔑 Login Default
Username: admin
Password: password
