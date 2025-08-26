<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Auth;

class RegisterController extends Controller
{
    public function index()
    {
        return Inertia::render('auth/register');
    }

    public function register(Request $request)
    {
        $credentials = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:255', 'unique:users'],
            'email' => ['required', 'email', 'string', 'unique:users'],
            'password' => ['required', 'string', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ]);

        Auth::login($user);

        return redirect()->intended('/dashboard');
    }
}
