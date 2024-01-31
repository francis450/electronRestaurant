<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Inventory;
use App\Models\Supplier;
use App\Models\UnitsOfMeasurement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{
    public function index()
    {
        $inventory = Inventory::all();

        $categoryIds = $inventory->pluck('category_id')->unique();
        $unitOfMeasurementIds = $inventory->pluck('unit_of_measurement_id')->unique();
        $supplierIds = $inventory->pluck('supplier')->unique();


        // get category and unit of measurement names
        $categories = Category::whereIn('id', $categoryIds)->get();
        $unitOfMeasurements = UnitsOfMeasurement::whereIn('id', $unitOfMeasurementIds)->get();
        $suppliers = Supplier::whereIn('id', $supplierIds)->get();

        // add category and unit of measurement names to inventory items
        foreach ($inventory as $item) {
            $item->category_name = $categories->where('id', $item->category_id)->first()->name;
            $item->unit_of_measurement_name = $unitOfMeasurements->where('id', $item->unit_of_measurement_id)->first()->name;
            $item->unit_of_measurement_symbol = $unitOfMeasurements->where('id', $item->unit_of_measurement_id)->first()->symbol;
            $item->supplier_name = $suppliers->where('id', $item->supplier)->first()->name;
        }

        return response()->json(['Items' => $inventory], 200);
    }

    public function show($id)
    {
        $inventory = Inventory::find($id);

        if (!$inventory) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $category = Category::where('id', $inventory->category_id)->first();
        $unitOfMeasurement = UnitsOfMeasurement::where('id', $inventory->unit_of_measurement_id)->first();
        $supplier = Supplier::where('id', $inventory->supplier)->first();

        $inventory->category_name = $category->name;
        $inventory->unit_of_measurement_name = $unitOfMeasurement->name;
        $inventory->unit_of_measurement_symbol = $unitOfMeasurement->symbol;
        $inventory->supplier_name = $supplier->name;

        return response()->json(['user' => $inventory], 200);
    }

    public function store1Item(Request $request)
    {
        $res = $request->validate([
            'item_id' => 'unique:inventory',
            'item_name' => 'required|string',
            'category_id' => 'required',
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
            'category_id' => $request->input('category_id'),
            'unit_of_measurement_id' => $request->input('unit_of_measurement_id'),
            'current_quantity' => $request->input('current_quantity'),
            'par_level' => $request->input('par_level'),
            'reorder_point' => $request->input('reorder_point'),
            'supplier' => $request->input('supplier'),
            'cost_per_unit' => $request->input('cost_per_unit'),
        ]);

        return response()->json(['data' => $item], 201, $res);
    }

    public function storeBulk(Request $request)
    {
        // Validate the bulk data
        $bulkData = $request->validate([
            '*.item_id' => 'unique:inventory,item_id', // unique validation for each item_id
            '*.item_name' => 'required|string',
            '*.category_id' => 'required',
            '*.unit_of_measurement_id' => 'required',
            '*.current_quantity' => 'nullable',
            '*.par_level' => 'nullable',
            '*.reorder_point' => 'nullable',
            '*.supplier' => 'nullable',
            '*.cost_per_unit' => 'nullable',
        ]);

        // Start a database transaction
        DB::beginTransaction();

        try {
            // Perform bulk insertion
            $items = [];
            foreach ($bulkData as $data) {
                $items[] = Inventory::create($data);
            }

            // Commit the transaction
            DB::commit();

            // Return a JSON response with the inserted items
            return response()->json(['data' => $items], 201);
        } catch (\Exception $e) {
            // Rollback the transaction in case of an error
            DB::rollback();

            // Return an error response
            return response()->json(['error' => 'Bulk insertion failed'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // find the item
        $item = Inventory::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        // loop through the request and update the item
        foreach ($request->all() as $key => $value) {
            $item->$key = $value;
        }

        $item->save();

        return response()->json(['data' => $item], 200);
    }

    public function destroy($id)
    {
        $item = Inventory::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Item deleted successfully'], 200);
    }
}
