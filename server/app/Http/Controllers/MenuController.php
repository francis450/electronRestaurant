<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Inventory;
use App\Models\MenuItem;
use App\Models\UnitsOfMeasurement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $items = MenuItem::select('id', 'name', 'description', 'price', 'is_available', 'img','note','created_at', 'menu_item_category_id')
            ->with(['category:id,name', 'ingredients:id,menu_item_id,inventory_item_id,quantity,unit_of_measurement_id,cost'])
            ->get();

        foreach ($items as $item) {
            foreach ($item->ingredients as $ingredient) {
                $ingredient->ingredient_name = Inventory::find($ingredient->inventory_item_id)->item_name;
                $ingredient->unit_of_measurement = UnitsOfMeasurement::find($ingredient->unit_of_measurement_id)->name;
            }
        }

        return response()->json([
            'data' => $items,
            'status' => 'success'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'menu_item_category_id' => 'integer',
            'ingredients' => 'required|array',
            'unit_of_measurement_id' => 'integer',
        ], [
            'name.required' => 'Name is required',
            'price.decimal' => 'Price must be a number',
            'menu_item_category_id.integer' => 'Category ID must be an integer',
            'ingredients.required' => 'Ingredients are required',
            'ingredients.array' => 'Ingredients must be an array',
            'unit_of_measurement_id.integer' => 'Unit of Measurement ID must be an integer',
        ]);

        $imageName = null;
        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $imageName = '/images/' . $imageName;

            $request->merge([
                'img' => $imageName
            ]);
        }
        $item = MenuItem::create($request->only(['name', 'description', "price", "menu_item_category_id", "img", "is_available", 'note']));

        $menuItems = array();
        $errs = array();
        foreach ($request->input('ingredients', []) as $ingredient) {
            $inventoryItem = Inventory::find($ingredient['inventory_item_id']);

            if (!$inventoryItem) {
                $errs[] = 'Item not found';
                continue;
            }

            $newIngredient = Ingredient::create([
                'inventory_item_id' => $ingredient['inventory_item_id'],
                'unit_of_measurement_id' => $ingredient['unit_of_measurement_id'],
                'menu_item_id' => $item->id,
                'quantity' => $ingredient['quantity'],
                'cost' => $ingredient['unit_of_measurement_id'] == $inventoryItem->unitOfMeasurement->id
                    ? $ingredient['quantity'] * $inventoryItem->cost_per_unit
                    : $ingredient['quantity'] * $inventoryItem->cost_per_unit * $inventoryItem->unitOfMeasurement->conversion_factor
            ]);

            $menuItems[] = $newIngredient;
        }
        if (count($errs)) {
            return response()->json([
                "status" => "error",
                "message" => $errs
            ]);
        }
        return response()->json([
            'data' => 'Menu Item created successfully',
            'status' => 'success'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = MenuItem::select('id', 'name', 'description', 'price', 'is_available', 'img', 'menu_item_category_id', 'note', 'created_at')
            ->with(['category:id,name', 'ingredients:id,menu_item_id,inventory_item_id,quantity,unit_of_measurement_id,cost'])
            ->find($id);

        if (!$item) {
            return response()->json(['message' => 'Menu Item Not Found'], 404);
        }

        foreach ($item->ingredients as $ingredient) {
            $ingredient->ingredient_name = Inventory::find($ingredient->inventory_item_id)->item_name;
            $ingredient->unit_of_measurement = UnitsOfMeasurement::find($ingredient->unit_of_measurement_id)->name;
        }

        return response()->json([
            'data' => $item,
            'status' => 'success'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //update a specific menu item
        $item = MenuItem::find($id);

        if (!$item) {
            return response()->json(['message' => 'Menu Item Not Found'], 404);
        }

        $request->validate([
                'name' => 'required',
                'price' => 'required|numeric',
                'menu_item_category_id' => 'integer',
                'ingredients' => 'required|array',
            ], [
                'name.required' => 'Name is required',
                'price.decimal' => 'Price must be a number',
                'menu_item_category_id.integer' => 'Category ID must be an integer',
                'ingredients.required' => 'Ingredients are required',
                'ingredients.array' => 'Ingredients must be an array',
        ]);

        $imageName = null;
        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $imageName = '/images/' . $imageName;

            $request->merge([
                'img' => $imageName
            ]);
        }

        $item->update($request->only(['name', 'description', "price", "menu_item_category_id", "img", "is_available", 'note']));

        $item->ingredients()->delete();

        
        foreach ($request->input('ingredients', []) as $ingredient) {
            $inventoryItem = Inventory::find($ingredient['inventory_item_id']);
            // validate ingredients details

            if (!$inventoryItem) {
                continue;
            }

            Ingredient::create([
                'inventory_item_id' => $ingredient['inventory_item_id'],
                'unit_of_measurement_id' => $ingredient['unit_of_measurement_id'],
                'menu_item_id' => $item->id,
                'quantity' => $ingredient['quantity'],
                'cost' => $ingredient['unit_of_measurement_id'] == $inventoryItem->unitOfMeasurement->id
                    ? $ingredient['quantity'] * $inventoryItem->cost_per_unit
                    : $ingredient['quantity'] * $inventoryItem->cost_per_unit * $inventoryItem->unitOfMeasurement->conversion_factor
            ]);
        }

        $menuItem = MenuItem::select('id', 'name', 'description', 'price', 'is_available', 'img', 'menu_item_category_id', 'note', 'created_at')
            ->with(['category:id,name', 'ingredients:id,menu_item_id,inventory_item_id,quantity,unit_of_measurement_id,cost'])
            ->find($id);

        return response()->json([
            'data' => 'Menu Item updated successfully',
            'status' => 'success',
            "item" => $menuItem
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $item = MenuItem::find($id);

        if (!$item) {
            return response()->json(['message' => 'Menu Item Not Found'], 404);
        }

        $item->delete();

        return response()->json([
            'data' => "Item Deleted Successfull",
            'status' => 'success'
        ], 200);
    }
}
