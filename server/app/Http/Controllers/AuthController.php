<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->only('username', 'password');
            if (Auth::attempt($credentials)) {
            // Authentication passed...
            return response()->json(['message' => 'Authenticated successfully']);
        } else {
            // Authentication failed...
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }
}