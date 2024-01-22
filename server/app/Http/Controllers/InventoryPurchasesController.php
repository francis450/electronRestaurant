<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\InventoryPurchaseItem;
use App\Models\InventoryPurchaseReceipt;
use Illuminate\Http\Request;

class InventoryPurchasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $receipts = InventoryPurchaseReceipt::all();

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
            // 'product_id' => 'required',
            // 'quantity' => 'required',
            // 'price' => 'required',
        ]);

        // create the purchase receipt
        $receipt = InventoryPurchaseReceipt::create($request->only('receipt_number', 'supplier_id', 'date', 'total_cost', 'payment_method'));
        $purchaseItems = array();
        
        foreach ($request->input('items', []) as $itemData) {
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
            

            //make a purchase item
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

        if(!$receipt) {
            return response()->json([
                "message" => "Receipt Not Found"
            ]);
        }

        return response()->json([
            'receipt' => $receipt,
            'status' => 'success'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
