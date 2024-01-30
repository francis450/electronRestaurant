<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Inventory;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $items = MenuItem::select('id', 'name', 'description', 'price', 'is_available', 'img', 'category_id')
            ->with(['category:id,name', 'ingredients:id,menu_item_id,inventory_item_id,quantity,cost'])
            ->get();

        foreach ($items as $item) {
            foreach ($item->ingredients as $ingredient) {
                $ingredient->ingredient_name = Inventory::find($ingredient->inventory_item_id)->item_name;
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
            'category_id' => 'integer',
        ], [
            'name.required' => 'Name is required',
            'price.decimal' => 'Price must be a number',
            'category_id.integer' => 'Category ID must be an integer'
        ]);

        $imageName = null;
        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $imageName = time().'.'.$request->image->extension();  
            $request->image->move(public_path('images'), $imageName);
            $imageName = '/images/'.$imageName;

            $request->merge([
                'img' => $imageName
            ]);
        }

        $item = MenuItem::create($request->only(['name', 'description', "price", "category_id", "img", "is_available", 'note']));

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
                'menu_item_id' => $item->id,
                'quantity' => $ingredient['quantity'],
                'cost' => $item->price/$ingredient['quantity']  
            ]);

            $menuItems[] = $newIngredient;
        }
        if(count($errs)){
            return response()->json([
                "status" => "error",
                "message" => $errs
            ]);
        }
        return response()->json([
            'data' => 'Menu Item created successfully',
            'status' => 'success'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // get the menu item with the specified id and return it with its category and ingredients and their inventory item names as well
        $item = MenuItem::select('id', 'name', 'description', 'price', 'is_available', 'img', 'category_id')
            ->with(['category:id,name', 'ingredients:id,menu_item_id,inventory_item_id,quantity,cost'])
            ->find($id);        
        
        if (!$item) {
            return response()->json(['message' => 'Menu Item Not Found'], 404);
        }

        foreach ($item->ingredients as $ingredient) {
            $ingredient->ingredient_name = Inventory::find($ingredient->inventory_item_id)->item_name;
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

        $item->update($request->all());

        return response()->json([
            'data' => 'Updated successfully',
            'status' => 'success'
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
