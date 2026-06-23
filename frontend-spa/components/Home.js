export default {
    template: `
        <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h1 class="text-5xl font-bold mb-4">Sistem Inventaris Barang</h1>
            <p class="text-xl mb-8">Kelola barang, kategori, dan supplier dengan mudah</p>
            <div class="space-x-4">
                <router-link to="/login" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Login</router-link>
                <router-link to="/dashboard" class="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">Dashboard</router-link>
            </div>
        </div>
    `
};