export default {
    template: `
        <div>
            <!-- Navbar -->
            <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 class="text-xl font-bold">Dashboard Inventaris</h1>

                <div class="space-x-4">
                    <router-link to="/kategori" class="hover:underline">Kategori</router-link>
                    <router-link to="/supplier" class="hover:underline">Supplier</router-link>
                    <router-link to="/barang" class="hover:underline">Barang</router-link>

                    <button
                        @click="logout"
                        class="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <!-- Konten -->
            <div class="p-8">

                <h2 class="text-2xl font-semibold">Selamat datang, Admin!</h2>
                <p class="mt-2 text-gray-600">
                    Gunakan menu di atas untuk mengelola data inventaris.
                </p>

                <!-- Statistik -->
                <div class="grid grid-cols-3 gap-4 mt-6">

                    <div class="bg-blue-100 p-4 rounded shadow text-center">
                        <h3 class="text-lg font-bold">Total Kategori</h3>
                        <p class="text-2xl">{{ kategoriCount }}</p>
                    </div>

                    <div class="bg-green-100 p-4 rounded shadow text-center">
                        <h3 class="text-lg font-bold">Total Supplier</h3>
                        <p class="text-2xl">{{ supplierCount }}</p>
                    </div>

                    <div class="bg-yellow-100 p-4 rounded shadow text-center">
                        <h3 class="text-lg font-bold">Total Barang</h3>
                        <p class="text-2xl">{{ barangCount }}</p>
                    </div>

                </div>

            </div>
        </div>
    `,

    data() {
        return {
            kategoriCount: 0,
            supplierCount: 0,
            barangCount: 0,
            error: null
        };
    },

    async mounted() {
        await this.loadDashboard();
    },

    methods: {

        async loadDashboard() {

            try {

                // 🔐 TOKEN CI4 (AMAN UNTUK BACKEND PROTECTED)
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                };

                const resKategori = await axios.get('/kategori', config);
                this.kategoriCount = resKategori.data.length;

                const resSupplier = await axios.get('/supplier', config);
                this.supplierCount = resSupplier.data.length;

                const resBarang = await axios.get('/barang', config);
                this.barangCount = resBarang.data.length;

            } catch (err) {
                console.error('Gagal memuat statistik', err);
                this.error = 'Gagal memuat data dashboard';
            }

        },

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            this.$router.push('/login');
        }

    }
};