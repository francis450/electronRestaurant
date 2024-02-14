<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();

        return response()->json(['data' => $orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'table_id' => 'required|integer',
            'order_items' => 'required|array',
            'user_id' => 'required|integer',
            'order_items.*.menu_item_id' => 'required|integer',
            'order_items.*.quantity' => 'required|integer',
            'order_items.*.unit_price' => 'required|numeric',
        ], [
            'order_items.*.menu_item_id.required' => 'Menu item id is required',
            'order_items.*.quantity.required' => 'Quantity is required',
            'order_items.*.unit_price.required' => 'Price is required',
        ]);

        $totalPrice = 0;
        foreach($request->order_items as $item) {
            $totalPrice += $item['quantity'] * $item['unit_price'];
        }

        $request->merge(['total_price' => $totalPrice]);

        $order = Order::create($request->all());

        foreach($request->order_items as $item) {
            $item['subtotal'] = $item['quantity'] * $item['unit_price'];
            $order->orderItems()->create($item);
        }

        return response()->json([
            'data' => $order,
            'status' => 'success'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'message' => 'Order not found',
                'status' => 'error'
            ], 404);
        }

        return response()->json([
            'data' => $order,
            'status' => 'success'
        ], 200);
    }
   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Order::find($id);
        if(!$order) {
            return response()->json([
                'message' => 'Order not found',
                'status' => 'error'
            ], 404);
        }

        $order->delete();

        return response()->json([
            'message' => 'Order deleted',
            'status' => 'success'
        ], 200);
    }
}
