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

        foreach ($receipts as $receipt) {
            $supplier = Supplier::find($receipt->supplier_id);
            $receipt->supplier_name = $supplier->name;
        }

        foreach ($receipts as $receipt) {
            $items = InventoryPurchaseItem::where('purchase_receipt_id', $receipt->id)->get();
            foreach ($items as $item) {
                $inventoryItem = Inventory::where('id', $item->inventory_item_id)->first();
                $item->inventory_name = $inventoryItem->item_name;
            }
            $receipt->items = $items;
        }

        return response()->json([
            'data' => $receipts,
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
        $receipt = InventoryPurchaseReceipt::create($request->all());
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
            'data' => 'Item Added Successfully',
            'status' => 'success'
        ], 201);
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

        // get items
        $items = InventoryPurchaseItem::where('purchase_receipt_id', $receipt->id)->get();

        // get items' names from inventory table
        foreach ($items as $item) {
            $inventoryItem = Inventory::where('id', $item->inventory_item_id)->first();
            $item->item_name = $inventoryItem->item_name;
        }

        // add items to the receipt body
        $receipt->items = $items;

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
