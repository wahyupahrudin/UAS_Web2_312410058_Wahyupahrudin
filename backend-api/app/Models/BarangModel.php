<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $table = 'barang';
    protected $primaryKey = 'id';
    protected $allowedFields = ['nama_barang', 'harga', 'stok', 'id_kategori', 'id_supplier'];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    // Method untuk mengambil data barang dengan join kategori dan supplier
    public function getBarangWithRelations()
    {
        return $this->select('barang.*, kategori.nama_kategori, supplier.nama_supplier')
                    ->join('kategori', 'kategori.id = barang.id_kategori')
                    ->join('supplier', 'supplier.id = barang.id_supplier')
                    ->findAll();
    }
}