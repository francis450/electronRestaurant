<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::all();

        return response()->json(["data"=>$payments]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate request
        $this->validate($request, [
            'order_id' => 'required',
            'user_id' => 'required',
            'amount' => 'required',
            'payment_method' => 'required'
        ],[
            'order_id.required' => 'Order ID is required',
            'user_id.required' => 'User ID is required',
            'amount.required' => 'Amount is required',
            'payment_method.required' => 'Payment Method is required'
        ]);

        $request->merge([
            'status' => 'completed',
            'change' => $request->amount - Order::find($request->order_id)->total_price
        ]);

        $payment = Payment::create($request->all());

        return response()->json(["message"=>"Payment Created","data"=>$payment], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $payment = Payment::find($id);

        if(!$payment){
            return response()->json(["message"=>"Payment not found"], 404);
        }

        return response()->json(["data"=>$payment]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $payment = Payment::find($id);

        if(!$payment){
            return response()->json(['message'=>"Transaction Not Found"],404);
        }else{
            return response()->json(['message'=>"Transaction Deleted","data"=>
            $payment->delete()
            ],200);
        }
    }
}
