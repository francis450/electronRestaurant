<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get all sections with their tables
        $sections = Section::with('tables')->get();

        // return a collection of sections with their tables
        return response()->json(["data" => $sections]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
        ]);
        
        $section = Section::create($validated);

        return response()->json([
            "message" => "Section created successfully",
            "data" => $section
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $section = Section::with('tables')->find($id);

        return response()->json(["data" => $section]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $section = Section::find($id);

        if($section)
        {
            // validate the request
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'string|max:255',
            ]);

            // update the section
            $section->update($validated);

            // return a response
            return response()->json([
                "message" => "Section updated successfully",
                "data" => $section
            ]);
        }
        else
        {
            return response()->json(["message" => "Section not found"]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $section = Section::find($id);

        if($section)
        {
            $section->delete();
            return response()->json(["message" => "Section deleted successfully"]);
        }
        else
        {
            return response()->json(["message" => "Section not found"]);
        }
    }
}
