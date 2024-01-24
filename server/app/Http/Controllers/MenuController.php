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
        //List all menu items available
        $item = MenuItem::all();

        return response()->json([
            'items' => $item,
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
            'description' => 'string',
            'price' => 'decimal:2',
            'category_id' => 'integer',
        ]);

        $item = MenuItem::create($request->only(['name', 'description', "price", "category_id", "img_url", "status", 'note']));

        $menuItems = array();
        $errs = array();
        foreach ($request->input('ingredients', []) as $ingredient) {
            // find the item in the inventory
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
            'Menu item' => $item,
            'Ingredients' => $menuItems,
            'status' => 'success'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = MenuItem::find($id);

        if (!$item) {
            return response()->json(['message' => 'Menu Item Not Found'], 404);
        }
        
        // $itsIngredients = DB::statement("SELECT * FROM ingredients WHERE menu_item_id = '$item->id'");

        $allIngredients = DB::table('ingredients')->where('menu_item_id', $item->id)->get()->all();
        
        return response()->json([
            'menu_item' => $item,
            'ingredients' => $allIngredients,
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
            'item' => $item,
            'message' => 'Updated successfully',
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
            'message' => "Item Deleted Successfull"
        ], 200);
    }
}
