<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\KategoriModel;

class KategoriController extends ResourceController
{
    protected $modelName = 'App\Models\KategoriModel';
    protected $format    = 'json';

    public function index()
    {
        $data = $this->model->findAll();
        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Kategori tidak ditemukan');
        }
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->save($data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respondCreated(['message' => 'Kategori berhasil ditambahkan']);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->update($id, $data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['message' => 'Kategori berhasil diupdate']);
    }

    public function delete($id = null)
    {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Kategori tidak ditemukan');
        }
        return $this->respondDeleted(['message' => 'Kategori berhasil dihapus']);
    }
}