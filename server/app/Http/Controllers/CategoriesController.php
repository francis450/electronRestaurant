<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // list all categories
        return Category::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // create a new category
        $category = Category::create($request->all());

        return response()->json(
            [
                "message" => $category,
                "status" => "success"
            ], 
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // return a json object of a category
        return Category::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // update a category
        $category = Category::findOrFail($id);

        $category->update($request->all());

        return response()->json([
            'message' => 'successfully updated', 
            "status" => "success"], 
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // delete a category
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json(['message' => 'successfully deleted', "status" => "success"], 204);
    }
}
