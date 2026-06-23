export default {
    template: `
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
                <form @submit.prevent="login">
                    <div class="mb-4">
                        <label class="block text-gray-700">Username</label>
                        <input v-model="username" type="text" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700">Password</label>
                        <input v-model="password" type="password" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring" required>
                    </div>
                    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
                </form>
                <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
            </div>
        </div>
    `,
    data() {
        return { username: '', password: '', error: null }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('/login', {
                    username: this.username,
                    password: this.password
                });
                const { token } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('isLoggedIn', 'true');
                this.$router.push('/dashboard');
            } catch (err) {
                this.error = err.response?.data?.message || 'Login gagal';
            }
        }
    }
};