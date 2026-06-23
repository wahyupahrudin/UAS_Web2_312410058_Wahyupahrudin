export default {

template: `

<div>

<nav class="bg-gray-800 text-white p-4 flex justify-between">

<h1 class="text-xl font-bold">
Manajemen Barang
</h1>

<div class="space-x-4">

<router-link to="/dashboard">
Dashboard
</router-link>

<router-link to="/kategori">
Kategori
</router-link>

<router-link to="/supplier">
Supplier
</router-link>

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
Daftar Barang
</h2>

<button
@click="openModal()"
class="bg-green-500 text-white px-4 py-2 rounded"
>
Tambah Barang
</button>

</div>

<table class="min-w-full border">

<thead>

<tr>

<th class="border p-2">No</th>

<th class="border p-2">Nama</th>
<th class="border p-2">Harga</th>
<th class="border p-2">Stok</th>
<th class="border p-2">Kategori</th>
<th class="border p-2">Supplier</th>
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
{{ item.nama_barang }}
</td>

<td class="border p-2">
{{ item.harga }}
</td>

<td class="border p-2">
{{ item.stok }}
</td>

<td class="border p-2">
{{ item.nama_kategori }}
</td>

<td class="border p-2">
{{ item.nama_supplier }}
</td>

<td class="border p-2">

<button
@click="openModal(item)"
class="bg-yellow-500 text-white px-2 py-1 mr-2"
>
Edit
</button>

<button
@click="hapus(item.id)"
class="bg-red-500 text-white px-2 py-1"
>
Hapus
</button>

</td>

</tr>

</tbody>

</table>

</div>

<div
v-if="showModal"
class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
>

<div class="bg-white p-6 rounded w-full max-w-lg">

<h2 class="text-xl font-bold mb-4">
{{ modalTitle }}
</h2>

<form @submit.prevent="simpan">

<input
v-model="form.nama_barang"
placeholder="Nama Barang"
class="w-full border p-2 mb-3"
required
>

<input
v-model="form.harga"
type="number"
placeholder="Harga"
class="w-full border p-2 mb-3"
required
>

<input
v-model="form.stok"
type="number"
placeholder="Stok"
class="w-full border p-2 mb-3"
required
>

<select
v-model="form.id_kategori"
class="w-full border p-2 mb-3"
required
>

<option :value="null">Pilih Kategori</option>

<option
v-for="k in kategoriList"
:key="k.id"
:value="k.id"
>
{{ k.nama_kategori }}
</option>

</select>

<select
v-model="form.id_supplier"
class="w-full border p-2 mb-3"
required
>

<option :value="null">Pilih Supplier</option>

<option
v-for="s in supplierList"
:key="s.id"
:value="s.id"
>
{{ s.nama_supplier }}
</option>

</select>

<div class="flex justify-end">

<button
type="button"
@click="closeModal"
class="bg-gray-500 text-white px-4 py-2 mr-2"
>
Batal
</button>

<button
type="submit"
class="bg-blue-500 text-white px-4 py-2"
>
Simpan
</button>

</div>

</form>

</div>

</div>

</div>

`,

data(){

return{

data:[],
kategoriList:[],
supplierList:[],
showModal:false,
modalTitle:'Tambah Barang',
isEdit:false,

form:{
id:null,
nama_barang:'',
harga:0,
stok:0,
id_kategori:null,
id_supplier:null
}

};

},

mounted(){
this.fetchData();
this.loadKategoriSupplier();
},

methods:{

async fetchData(){

try{

const res = await axios.get('/barang');
this.data = res.data;

}

catch(err){
console.log(err);
alert('Gagal load barang');
}

},

async loadKategoriSupplier(){

try{

const kat = await axios.get('/kategori');
this.kategoriList = kat.data;

const sup = await axios.get('/supplier');
this.supplierList = sup.data;

}

catch(err){
console.log(err);
alert('Kategori atau Supplier gagal dimuat');
}

},

openModal(item=null){

if(item){
this.isEdit = true;
this.modalTitle = 'Edit Barang';
this.form = {...item};
}else{
this.isEdit = false;
this.modalTitle = 'Tambah Barang';
this.form = {
id:null,
nama_barang:'',
harga:0,
stok:0,
id_kategori:null,
id_supplier:null
};
}

this.showModal = true;

},

closeModal(){
this.showModal = false;
},

async simpan(){

try{

if(this.isEdit){

await axios.put(`/barang/${this.form.id}`, this.form);

}else{

await axios.post('/barang', this.form);

}

alert('Barang berhasil disimpan');

this.closeModal();
await this.fetchData();

}

catch(err){
console.log(err);
alert(JSON.stringify(err.response?.data));
}

},

async hapus(id){

try{

if(confirm('Hapus data?')){

await axios.delete(`/barang/${id}`);
await this.fetchData();

}

}

catch(err){
console.log(err);
}

},

logout(){

localStorage.removeItem('token');
localStorage.removeItem('isLoggedIn');
this.$router.push('/login');

}

}

};