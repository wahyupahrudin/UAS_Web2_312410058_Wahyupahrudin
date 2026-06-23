<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
    protected $format    = 'json';

    public function login()
    {
        // Ambil data JSON dari request
        $data = $this->request->getJSON(true);
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        // Cari user di database
        $user = $this->model->where('username', $username)->first();
        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Username atau password salah');
        }

        // Buat JWT token
        $key = getenv('JWT_SECRET') ?: 'default_secret_key';
        $payload = [
            'id'       => $user['id'],
            'username' => $user['username'],
            'iat'      => time(),
            'exp'      => time() + (60 * 60 * 24) // 1 hari
        ];
        $token = JWT::encode($payload, $key, 'HS256');

        // Kirim response
        return $this->respond([
            'status'  => 200,
            'message' => 'Login berhasil',
            'token'   => $token,
            'user'    => $user
        ]);
    }
}