<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        // Retrieve all users
        $users = User::all();

        return response()->json(['users' => $users], 200);
    }

    public function show($id)
    {
        // Retrieve a specific user by ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(['user' => $user], 200);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'username' => 'required|unique:users',
            'password' => 'required',
            'role' => 'required',
            // Add other validation rules for attributes
        ]);

        // Create a new user
        $user = User::create($request->all());

        return response()->json(['user' => $user], 201);
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request
        $request->validate([
            'username' => 'required|unique:users,username,' . $id,
            // Add other validation rules for attributes
        ]);

        // Find the user by ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user
        $user->update($request->all());

        return response()->json(['user' => $user], 200);
    }

    public function destroy($id)
    {
        // Find the user by ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Delete the user
        $user->delete();

        return response()->json(['message' => 'User deleted'], 200);
    }
}
