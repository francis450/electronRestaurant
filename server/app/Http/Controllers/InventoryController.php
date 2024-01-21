<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        // Retrieve all inventory
        $inventory = Inventory::all();

        return response()->json(['users' => $inventory], 200,['']);
    }

    public function show($id)
    {
        $inventory = Inventory::findOrFail($id);

        if (!$inventory) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        return response()->json(['user' => $inventory], 200);
    }

    public function store1Item(Request $request)
    {   
        $res = $request->validate([
            'item_id' => 'unique:inventory',
            'item_name' => 'required|string',
            'category' => 'required|string',
            'unit_of_measurement_id' => 'required',
            'current_quantity' => 'nullable',
            'par_level' => 'nullable',
            'reorder_point' => 'nullable',
            'supplier' => 'nullable',
            'cost_per_unit' => 'nullable',
        ]);

        $item = Inventory::create([
            'item_id' => $request->input('item_id'),
            'item_name' => $request->input('item_name'),
            'category' => $request->input('category'),
            'unit_of_measurement_id' => $request->input('unit_of_measurement_id'),
            'current_quantity' => $request->input('current_quantity'),
            'par_level' => $request->input('par_level'),
            'reorder_point' => $request->input('reorder_point'),
            'supplier' => $request->input('supplier'),
            'cost_per_unit' => $request->input('cost_per_unit'),
        ]);

        return response()->json(['data' => $item], 201, $res);
    }

    public function storeBulk(Request $request){
        // bulk validation

        // bulk insertion

        // response
    }

    
}
