<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\RegController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/authenticate', [AuthController::class, 'authenticate']);

Route::post('/register', [RegController::class, 'register']);

Route::controller(UserController::class)->group(function(){
    Route::get('/users', 'index');
    Route::get('/user/{id}', 'show');
});


Route::controller(InventoryController::class)->group(function(){
    Route::post('/newInventoryItem', 'store1Item');
    Route::get('/inventoryItems', 'index');
    Route::get('/inventoryItem/{id}', 'show');
});

Route::controller(SuppliersController::class)->group(function(){
    Route::post('/newSupplier', 'store');
    Route::get('/suppliers', 'index');
    Route::get('supplier/{id}', 'show');
    Route::delete('supplier/{id}', 'destroy');
    Route::post('editSupplier/{id}', 'update');
});