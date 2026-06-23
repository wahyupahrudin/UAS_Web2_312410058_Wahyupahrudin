export default {
    template: `
        <div>
            <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 class="text-xl font-bold">Manajemen Kategori</h1>

                <div class="space-x-4">
                    <router-link to="/dashboard">Dashboard</router-link>
                    <router-link to="/supplier">Supplier</router-link>
                    <router-link to="/barang">Barang</router-link>

                    <button
                        @click="logout"
                        class="bg-red-500 px-4 py-1 rounded"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div class="p-8">

                <div class="flex justify-between mb-4">
                    <h2 class="text-2xl font-bold">
                        Daftar Kategori
                    </h2>

                    <button
                        @click="openModal()"
                        class="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Tambah Kategori
                    </button>
                </div>

                <table class="min-w-full border">

                    <thead>
                        <tr>
                            <th class="border p-2">No</th>
                            <th class="border p-2">Nama Kategori</th>
                            <th class="border p-2">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr
                            v-for="(item, index) in data"
                            :key="item.id"
                        >
                            <td class="border p-2">
                                {{ index + 1 }}
                            </td>

                            <td class="border p-2">
                                {{ item.nama_kategori }}
                            </td>

                            <td class="border p-2">

                                <button
                                    @click="openModal(item)"
                                    class="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>

                                <button
                                    @click="hapus(item.id)"
                                    class="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Hapus
                                </button>

                            </td>
                        </tr>

                        <!-- EMPTY STATE -->
                        <tr v-if="data.length === 0">
                            <td colspan="3" class="text-center p-4">
                                Data kosong
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

            <div
                v-if="showModal"
                class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
            >

                <div class="bg-white p-6 rounded w-full max-w-md">

                    <h3 class="text-xl font-bold mb-4">
                        {{ modalTitle }}
                    </h3>

                    <form @submit.prevent="simpan">

                        <label>
                            Nama Kategori
                        </label>

                        <input
                            v-model="form.nama_kategori"
                            type="text"
                            class="w-full border p-2 mb-4"
                            required
                        >

                        <div class="flex justify-end">

                            <button
                                type="button"
                                @click="closeModal"
                                class="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
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
            modalTitle: 'Tambah Kategori',
            form: {
                id: null,
                nama_kategori: ''
            },
            isEdit: false
        };
    },

    mounted() {
        this.fetchData();
    },

    methods: {

        async fetchData() {
            try {
                const res = await axios.get('/kategori');
                this.data = res.data;
            } catch (err) {
                console.log(err);
                alert('Gagal mengambil data kategori');
            }
        },

        openModal(item = null) {
            if (item) {
                this.isEdit = true;
                this.modalTitle = 'Edit Kategori';
                this.form = { ...item };
            } else {
                this.isEdit = false;
                this.modalTitle = 'Tambah Kategori';
                this.form = {
                    id: null,
                    nama_kategori: ''
                };
            }

            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
        },

        async simpan() {
            try {
                if (this.isEdit) {
                    await axios.put(`/kategori/${this.form.id}`, this.form);
                } else {
                    await axios.post('/kategori', this.form);
                }

                alert('Kategori berhasil disimpan');
                this.closeModal();
                await this.fetchData();

            } catch (err) {
                console.log(err);
                alert(JSON.stringify(err.response?.data));
            }
        },

        async hapus(id) {
            try {
                if (confirm('Yakin hapus?')) {
                    await axios.delete(`/kategori/${id}`);
                    await this.fetchData();
                }
            } catch (err) {
                console.log(err);
            }
        },

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            this.$router.push('/login');
        }

    }
};