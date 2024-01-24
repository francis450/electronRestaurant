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
            $user = Auth::user();

            // get the last token
            $token = $user->tokens->first();

            if(!$token){
                $token = $user->createToken($request->username)->accessToken;
            }

            return response()->json(
                [
                    'id' => $user->id,
                    'status' => 'success',
                    'username' => $user->username,
                    'role' => $user->role,
                    'token' => $token->token
                ]
            );
        } else {
            // Authentication failed...
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }
}
