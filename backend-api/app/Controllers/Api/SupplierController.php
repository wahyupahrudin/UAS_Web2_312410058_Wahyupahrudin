<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SupplierModel;

class SupplierController extends ResourceController
{
    protected $modelName = 'App\Models\SupplierModel';
    protected $format    = 'json';

    // GET /api/supplier -> Menampilkan semua data supplier
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    // GET /api/supplier/{id} -> Menampilkan 1 supplier berdasarkan ID
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Supplier tidak ditemukan');
        }
        return $this->respond($data);
    }

    // POST /api/supplier -> Menambah supplier baru
    public function create()
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->save($data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respondCreated(['message' => 'Supplier berhasil ditambahkan']);
    }

    // PUT /api/supplier/{id} -> Mengupdate supplier
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->update($id, $data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['message' => 'Supplier berhasil diupdate']);
    }

    // DELETE /api/supplier/{id} -> Menghapus supplier
    public function delete($id = null)
    {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Supplier tidak ditemukan');
        }
        return $this->respondDeleted(['message' => 'Supplier berhasil dihapus']);
    }
}