export default {
    template: `
        <div>
            <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 class="text-xl font-bold">Manajemen Supplier</h1>

                <div class="space-x-4">
                    <router-link to="/dashboard" class="hover:underline">Dashboard</router-link>
                    <router-link to="/kategori" class="hover:underline">Kategori</router-link>
                    <router-link to="/barang" class="hover:underline">Barang</router-link>

                    <button
                        @click="logout"
                        class="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div class="p-8">

                <div class="flex justify-between mb-4">
                    <h2 class="text-2xl font-semibold">Daftar Supplier</h2>

                    <button
                        @click="openModal()"
                        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Tambah Supplier
                    </button>
                </div>

                <table class="min-w-full bg-white border">

                    <thead>
                        <tr>
                            <th class="border px-4 py-2">No</th>
                            <th class="border px-4 py-2">Nama Supplier</th>
                            <th class="border px-4 py-2">Alamat</th>
                            <th class="border px-4 py-2">Kontak</th>
                            <th class="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="(item, index) in data" :key="item.id">

                            <td class="border px-4 py-2">
                                {{ index + 1 }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ item.nama_supplier }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ item.alamat }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ item.kontak }}
                            </td>

                            <td class="border px-4 py-2">
                                <button
                                    @click="openModal(item)"
                                    class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>

                                <button
                                    @click="hapus(item.id)"
                                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Hapus
                                </button>
                            </td>

                        </tr>

                        <!-- EMPTY STATE -->
                        <tr v-if="data.length === 0">
                            <td colspan="5" class="text-center p-4">
                                Data kosong
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

            <!-- Modal -->
            <div
                v-if="showModal"
                class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
            >
                <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">

                    <h3 class="text-xl font-bold mb-4">
                        {{ modalTitle }}
                    </h3>

                    <form @submit.prevent="simpan">

                        <div class="mb-4">
                            <label class="block text-gray-700">Nama Supplier</label>
                            <input
                                v-model="form.nama_supplier"
                                type="text"
                                class="w-full px-4 py-2 border rounded"
                                required
                            >
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700">Alamat</label>
                            <textarea
                                v-model="form.alamat"
                                class="w-full px-4 py-2 border rounded"
                            ></textarea>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700">Kontak</label>
                            <input
                                v-model="form.kontak"
                                type="text"
                                class="w-full px-4 py-2 border rounded"
                            >
                        </div>

                        <div class="flex justify-end">

                            <button
                                type="button"
                                @click="closeModal"
                                class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                class="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Simpan
                            </button>

                        </div>

                    </form>

                </div>
            </div>

        </div>
    `,

    data() {
        return {
            data: [],
            showModal: false,
            modalTitle: 'Tambah Supplier',
            form: { id: null, nama_supplier: '', alamat: '', kontak: '' },
            isEdit: false
        };
    },

    mounted() {
        this.fetchData();
    },

    methods: {

        async fetchData() {
            const res = await axios.get('/supplier');
            this.data = res.data;
        },

        openModal(item = null) {
            if (item) {
                this.isEdit = true;
                this.modalTitle = 'Edit Supplier';
                this.form = { ...item };
            } else {
                this.isEdit = false;
                this.modalTitle = 'Tambah Supplier';
                this.form = { id: null, nama_supplier: '', alamat: '', kontak: '' };
            }
            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
        },

        async simpan() {
            if (this.isEdit) {
                await axios.put(`/supplier/${this.form.id}`, this.form);
            } else {
                await axios.post('/supplier', this.form);
            }
            this.closeModal();
            this.fetchData();
        },

        async hapus(id) {
            if (confirm('Yakin hapus data ini?')) {
                await axios.delete(`/supplier/${id}`);
                this.fetchData();
            }
        },

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            this.$router.push('/login');
        }

    }
};