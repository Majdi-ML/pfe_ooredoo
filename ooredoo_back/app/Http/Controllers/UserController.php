<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // GET /api/user
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    // POST /api/register (optionnel si LDAP uniquement)
    

    // GET /api/user/{id}
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json($user, 200);
    }

    // PUT /api/user/{id}
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'username' => 'sometimes|string',
            'email' => 'sometimes|email',
            'password' => 'sometimes|string|min:6',
            'role_id' => 'sometimes|integer',
            'support_id' => 'sometimes|integer',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json(['message' => 'User updated', 'user' => $user], 200);
    }

    // DELETE /api/user/{id}
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted'], 200);
    }

    // GET /api/user (authenticated)
    public function me()
    {
        return response()->json(Auth::user(), 200);
    }
}
