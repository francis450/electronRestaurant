<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InventoryPurchasesController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MenuItemCategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RegController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\TablesController;
use App\Http\Controllers\UserController;
use App\Models\MenuItem;
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

Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'index');
    Route::get('/user/{id}', 'show');
});


Route::controller(InventoryController::class)->group(function () {
    Route::post('/newInventoryItem', 'store1Item');
    Route::get('/inventoryItems', 'index');
    Route::get('/inventoryItem/{id}', 'show');
    Route::put('/inventoryItem/{id}', 'update');
    Route::delete('/inventoryItem/{id}', 'destroy');
});

Route::controller(SuppliersController::class)->group(function () {
    Route::post('/newSupplier', 'store');
    Route::get('/suppliers', 'index');
    Route::get('supplier/{id}', 'show');
    Route::delete('supplier/{id}', 'destroy');
    Route::post('editSupplier/{id}', 'update');
});

Route::controller(MenuController::class)->group(function () {
    Route::post('/menu', 'store');
    Route::get('/menu', 'index');
    Route::get('menu/{id}', 'show');
    Route::delete('/menu/{id}', 'destroy');
    Route::post('/menu/{id}', 'update');
});

Route::get('/unitsofmeasure', function () {
    return \App\Models\UnitsOfMeasurement::all();
});

Route::get('/unitofmeasure/{id}', function ($id) {
    $unit = \App\Models\UnitsOfMeasurement::find($id);

    if (!$unit) {
        return response()->json([
            'message' => 'Unit not found',
            'status' => 'error'
        ], 404);
    }

    if ($unit->type != 'base') {
        $subunit = collect([$unit]);
        return response()->json([
            'data' => $subunit,
            'status' => 'success'
        ], 200);
    }


    $allUnits = collect([$unit])->merge($unit->subunits);
    // remove subunits from $unit
    
    $allUnits = $allUnits->map(function ($unit) {
        unset($unit->subunits);
        return $unit;
    });    

    return response()->json([
        'data' => $allUnits,
        'status' => 'success'
    ], 200);
});


Route::post('/unitofmeasure', function (Request $request) {
    $baseUnit = \App\Models\UnitsOfMeasurement::create($request->all());
    return response()->json([
        'message' => 'successfully added unit',
        'unit' => $baseUnit,
        'status' => 'success'
    ], 201);
});

Route::controller(CategoriesController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::get('/category/{id}', 'show');
    Route::post('/category', 'store');
    Route::delete('/category/{id}', 'destroy');
    Route::put('/category/{id}', 'update');
});

Route::controller(InventoryPurchasesController::class)->group(function () {
    Route::get('/purchases', 'index');
    Route::get('/purchase/{id}', 'show');
    Route::post('/purchase', 'store');
    Route::delete('/purchase/{id}', 'destroy');
});

Route::controller(MenuItemCategoryController::class)->group(function () {
    Route::get('/pos_menu_categories', 'index');
    Route::get('/pos_menu_category/{id}', 'show');
    Route::get('/menu_categories', 'indexAll');
    Route::get('/menu_category/{id}', 'showOne');
    Route::post('/menu_category', 'store');
    Route::delete('/menu_category/{id}', 'destroy');
    Route::put('/menu_category/{id}', 'update');
});

Route::controller(MenuItem::class)->group(function () {
    Route::get('/menu_items', 'index');
    Route::get('/menu_item/{id}', 'show');
    Route::post('/menu_item', 'store');
    Route::delete('/menu_item/{id}', 'destroy');
    Route::post('/menu_item/{id}', 'update');
});

Route::controller(SectionController::class)->group(function () {
    Route::get('/sections', 'index');
    Route::get('/section/{id}', 'show');
    Route::post('/section', 'store');
    Route::delete('/section/{id}', 'destroy');
    Route::put('/section/{id}', 'update');
});


Route::controller(TablesController::class)->group(function () {
    Route::get('/tables', 'index');
    Route::get('/table/{id}', 'show');
    Route::post('/table', 'store');
    Route::delete('/table/{id}', 'destroy');
    Route::put('/table/{id}', 'update');
});

Route::controller(OrderController::class)->group(function () {
    Route::get('/orders', 'index');
    Route::get('/order/{id}', 'show');
    Route::post('/order', 'store');
    Route::delete('/order/{id}', 'destroy');
});

Route::controller(PaymentController::class)->group(function () {
    Route::get('/payments', 'index');
    Route::get('/payment/{id}', 'show');
    Route::post('/payment', 'store');
    Route::delete('/payment/{id}', 'destroy');
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Method not allowed',
        'status' => 'error'
    ], 405);
});