<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;

class TablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tables = Table::all(['id',"name","description","section_id","created_at"]);

        return response()->json([
            'data' => $tables,
            'status' => 'success'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
            'section_id' => 'required|integer'
        ]);

        $table = Table::create($request->all());

        return response()->json([
            "message" => "Table Added Successfully",
            "data" => $table
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $table = Table::find($id);
        
        if(!$table) 
        {
            return response()->json([
                "message" => "Table Not Found"
            ], 404);
        }

        return response()->json([
            "data" => $table,
            "status" => "success"
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $table = Table::find($id);

        if(!$table) 
        {
            return response()->json([
                "message" => "Table Not Found"
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string|max:255',
            'section_id' => 'integer'
        ]);

        $table->update($validated);

        return response()->json([
            "message" => "Table Updated Successfully",
            "data" => $table
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $table = Table::find($id);

        if(!$table)
        {
            return response()->json([
                "message" => "Table Not Found"
            ], 404);
        }else{
            $table->delete();

            return response()->json(['message' => "Table Deleted Successfully"]);
        }
    }
}
