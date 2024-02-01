<?php

namespace App\Http\Controllers;

use App\Models\MenuItemCategory;
use Illuminate\Http\Request;

class MenuItemCategoryController extends Controller
{
    public function index()
    {
        $categories = MenuItemCategory::with('parent_category', 'child_categories', 'menu_items')->get();

        return response()->json([ "data" => $categories], 200);
    }

    public function show($id)
    {
        $category = MenuItemCategory::with('parent_category', 'child_categories', 'menu_items')->find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json(["data" => $category], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'parent_category_id' => 'nullable|exists:menu_item_categories,id',
            'description' => 'nullable|string',
        ]);

        $category = MenuItemCategory::create($request->all());

        return response()->json(["data" => $category], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'parent_category_id' => 'nullable|exists:menu_item_categories,id',
            'description' => 'nullable|string',
        ]);

        $category = MenuItemCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->update($request->all());

        return response()->json(["data"=>$category], 200);
    }

    public function destroy($id)
    {
        $category = MenuItemCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted'], 200);
    }
}
