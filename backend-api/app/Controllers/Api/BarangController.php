<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BarangModel;

class BarangController extends ResourceController
{
    protected $modelName = 'App\Models\BarangModel';
    protected $format    = 'json';

    // GET /api/barang -> Menampilkan semua barang + nama kategori & supplier (JOIN)
    public function index()
    {
        return $this->respond($this->model->getBarangWithRelations());
    }

    // GET /api/barang/{id} -> Menampilkan 1 barang berdasarkan ID
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Barang tidak ditemukan');
        }
        return $this->respond($data);
    }

    // POST /api/barang -> Menambah barang baru
    public function create()
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->save($data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respondCreated(['message' => 'Barang berhasil ditambahkan']);
    }

    // PUT /api/barang/{id} -> Mengupdate barang
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->update($id, $data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['message' => 'Barang berhasil diupdate']);
    }

    // DELETE /api/barang/{id} -> Menghapus barang
    public function delete($id = null)
    {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Barang tidak ditemukan');
        }
        return $this->respondDeleted(['message' => 'Barang berhasil dihapus']);
    }
}