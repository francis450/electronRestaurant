<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\InventoryPurchaseItem;
use App\Models\InventoryPurchaseReceipt;
use App\Models\Supplier;
use Illuminate\Http\Request;

class InventoryPurchasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $receipts = InventoryPurchaseReceipt::all();
        
        $supplierIds = $receipts->pluck('supplier_id')->unique();

        $suppliers = Supplier::whereIn('id', $supplierIds)->get();

        foreach ($receipts as $receipt) {
            $receipt->supplier_name = $suppliers->where('id', $receipt->supplier_id)->first()->name;
        }

        return response()->json([
            'receipts' => $receipts,
            'status' => 'success'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request...
        $validatedData = $request->validate([
            'receipt_number' => 'required',
            'supplier_id' => 'required',
            'date' => 'required',
            'total_cost' => 'required',
            'payment_method' => 'required',
            'items' => 'required'
        ]);
        
        // create the purchase receipt
        $receipt = InventoryPurchaseReceipt::create($request->only('receipt_number', 'supplier_id', 'date', 'total_cost', 'payment_method'));
        $purchaseItems = array();
        
        foreach ($request->input('items', []) as $itemData) {
            $request->validate([
                'product_id' => 'required',
                'quantity' => 'required',
                'unit_price' => 'required'
            ]);
            

            // update inventory quantity
            $inventoryItem = Inventory::find($itemData['product_id']);                        

            if($inventoryItem){
                $inventoryItem->current_quantity += $itemData['quantity'];
                $inventoryItem->save();
            }else{
                return response()->json([
                    'message' => "Item Not Found",
                    'status' => "error"
                ]);
            }

            $purchaseItem = InventoryPurchaseItem::create([
                'purchase_receipt_id' => $receipt->id,
                'inventory_item_id' => $inventoryItem->id,
                'quantity' => $itemData['quantity'],
                'unit_price' => $itemData['unit_price'],
                'subtotal' => $itemData['quantity'] * $itemData['unit_price']
            ]);

            $purchaseItems[] = $purchaseItem;
        }

        return response()->json([
            'receipt' => $receipt,
            'no_of_items' => $receipt->items(),
            'items' => json_encode($purchaseItems),
            'status' => 'success'
        ], 200);
    }

    public function show(string $id)
    {
        $receipt = InventoryPurchaseReceipt::find($id);
        
        if(!$receipt){
            return response()->json([
                "data" => "Receipt Not Found",
                "status" => "error"
            ], 404);
        }

        $supplier = Supplier::find($receipt->supplier_id);

        $receipt->supplier_name = $supplier->name;

        if(!$receipt) {
            return response()->json([
                "data" => "Receipt Not Found"
            ], 404);
        }

        return response()->json([
            'data' => $receipt,
            'status' => 'success'
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // check if user can perform action
        $receipt = InventoryPurchaseReceipt::find($id);

        if(!$receipt) {
            return response()->json([
                "data" => "Receipt Not Found"
            ]);
        }

        $receipt->delete();

        return response()->json([
            'data' => "Receipt Deleted successfully",
            'status' => 'success'
        ]);
    }
}
