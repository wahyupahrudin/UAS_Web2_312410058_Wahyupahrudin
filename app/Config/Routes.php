<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// =============================================
// ROUTE UNTUK LOGIN (TANPA AUTH)
// =============================================
$routes->post('api/login', 'Api\AuthController::login');

// =============================================
// GROUP ROUTE YANG DIPROTEKSI TOKEN
// =============================================
$routes->group('api', ['filter' => 'auth'], function($routes) {
    $routes->resource('kategori', ['controller' => 'Api\KategoriController']);
    $routes->resource('supplier', ['controller' => 'Api\SupplierController']);
    $routes->resource('barang', ['controller' => 'Api\BarangController']);
});