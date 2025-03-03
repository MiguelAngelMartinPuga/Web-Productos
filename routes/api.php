<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\PerfilPermisoController;
use App\Http\Controllers\PermisoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UsuarioController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:sanctum')->get('/user', [UsuarioController::class, 'getAuth']);





// TODO      Perfil
Route::post('/perfil', [PerfilController::class, 'postperfil']);
Route::get('/perfil', [PerfilController::class, 'getperfilAll']);
Route::get('/perfil/{id}', [PerfilController::class, 'getperfil']);
Route::put('/perfil/{id}', [PerfilController::class, 'putperfil']);
Route::delete('/perfil/{id}', [PerfilController::class, 'deleteperfil']);

// TODO      Perfil Permiso
Route::post('/perfilpermiso', [PerfilPermisoController::class, 'postperfilpermiso']);
Route::get('/perfilpermiso', [PerfilPermisoController::class, 'getperfilpermisoAll']);
Route::get('/perfilpermiso/{id}', [PerfilPermisoController::class, 'getperfilpermiso']);
Route::put('/perfilpermiso/{id}', [PerfilPermisoController::class, 'putperfilpermiso']);
Route::delete('/perfilpermiso/{id}', [PerfilPermisoController::class, 'deleteperfilpermiso']);

// TODO      Permiso
Route::post('/permiso', [PermisoController::class, 'postpermiso']);
Route::get('/permiso', [PermisoController::class, 'getpermisoAll']);
Route::get('/permiso/{id}', [PermisoController::class, 'getpermiso']);
Route::put('/permiso/{id}', [PermisoController::class, 'putpermiso']);
Route::delete('/permiso/{id}', [PermisoController::class, 'deletepermiso']);

// TODO      Producto
Route::post('/producto', [ProductoController::class, 'postproducto']);
Route::get('/producto', [ProductoController::class, 'getproductoAll']);
Route::get('/producto/{id}', [ProductoController::class, 'getproducto']);
Route::put('/producto/{id}', [ProductoController::class, 'putproducto']);
Route::delete('/producto/{id}', [ProductoController::class, 'deleteproducto']);

// TODO      Usuario
Route::post('/usuario', [UsuarioController::class, 'postusuario']);
Route::get('/usuario', [UsuarioController::class, 'getusuarioAll']);
Route::get('/usuario/{id}', [UsuarioController::class, 'getusuario']);
Route::put('/usuario/{id}', [UsuarioController::class, 'putusuario']);
Route::delete('/usuario/{id}', [UsuarioController::class, 'deleteusuario']);

//*LOGIN
Route::post('/login', [UsuarioController::class, 'login'])->name('login');

