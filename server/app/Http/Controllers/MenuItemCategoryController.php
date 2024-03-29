<?php

namespace App\Http\Controllers;

use App\Models\MenuItemCategory;
use Illuminate\Http\Request;

class MenuItemCategoryController extends Controller
{
    function getChildCategories($category, &$allCategories = [])
    {
        if ($category->child_categories->isNotEmpty()) {
            foreach ($category->child_categories as $child) {
                $allCategories[] = $child;
                $this->getChildCategories($child, $allCategories);
            }
        }
    }

    public function index()
    {
        $categories = MenuItemCategory::with('parent_category', 'child_categories', 'menu_items')->whereNull('parent_category_id')->get();

        $allCategories = [];
        foreach ($categories as $category) {
            $this->getChildCategories($category, $allCategories);
        }

        return response()->json(["data" => $categories], 200);
    }

    public function indexAll()
    {
        $categories = MenuItemCategory::all();

        foreach ($categories as $category) {
            $category->parent_category_name = $category->parent_category ? $category->parent_category->name : null;
            unset($category->parent_category);
        }

        return response()->json(["data" => $categories], 200);
    }

    public function show($id)
    {
        $category = MenuItemCategory::with('parent_category', 'child_categories', 'menu_items')->find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json(["data" => $category], 200);
    }

    public function showOne($id)
    {
        $category = MenuItemCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->parent_category_name = $category->parent_category ? $category->parent_category->name : null;
        unset($category->parent_category);

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

        return response()->json(["data" => $category], 200);
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
