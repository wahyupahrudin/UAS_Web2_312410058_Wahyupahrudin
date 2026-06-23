import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// axios sudah global (dari script tag di index.html)

import Home from './components/Home.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import Kategori from './components/Kategori.js';
import Supplier from './components/Supplier.js';
import Barang from './components/Barang.js';

const routes = [
    { path: '/', component: Home },

    { path: '/login', component: Login },

    // 🔐 PROTECTED ROUTES (NO 4 - Navigation Guard)
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/kategori',
        component: Kategori,
        meta: { requiresAuth: true }
    },
    {
        path: '/supplier',
        component: Supplier,
        meta: { requiresAuth: true }
    },
    {
        path: '/barang',
        component: Barang,
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 🔐 NO 4 - NAVIGATION GUARD (LOGIN PROTECTION)
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

// ===============================
// ⚡ NO 5 - AXIOS INTERCEPTORS
// ===============================

axios.defaults.baseURL = 'http://localhost:8080/api';

// 🔐 REQUEST INTERCEPTOR (AUTO TOKEN)
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

// 🔐 RESPONSE INTERCEPTOR (HANDLE 401)
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            alert('Sesi habis, silakan login ulang');

            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');

            router.push('/login');
        }

        return Promise.reject(error);
    }
);

// ===============================
// ROOT APP
// ===============================
const App = {
    template: `<router-view></router-view>`
};

const app = createApp(App);
app.use(router);
app.mount('#app');