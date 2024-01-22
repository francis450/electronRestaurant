<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SuppliersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::all();

        return response()->json(['suppliers' => $suppliers], 200,);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate request parameters
        $this->validate($request, [
            'name' => 'required',
            'email' => 'email|unique:suppliers',
            'phone' => 'unique:suppliers',
            'kra_pin' => 'unique:suppliers',
            'customer_unit_serial_number' => 'unique:suppliers',
        ]);

        //create supplier
        $supplier = Supplier::create([
            'name' => $request->name,
            'contact_name' => $request->contact_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'kra_pin' => $request->kra_pin,
            'customer_unit_serial_number' => $request->customer_unit_serial_number,
        ]);

        //return supplier as a resource
        return response()->json(['supplier added' => $supplier], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $supplier = Supplier::find($id);

        if(!$supplier) {
            return response()->json(['message' => 'Supplier Not Found', 404]);
        }

        return response()->json(['supplier' => $supplier],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //update supplier
        $supplier = Supplier::find($id);

        if(!$supplier) {
            return response()->json(['message' => 'Supplier Not Found', 404]);
        }

        $supplier->update($request->all());

        return response()->json(['supplier' => $supplier], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //find supplier
        $supplier = Supplier::find($id);

        if(!$supplier) {
            return response()->json(['message' => 'Supplier Not Found', 404]);
        }

        $supplier->delete();

        return response()->json(['message' => 'Supplier Deleted Successfully'], 200);
    }
}
