<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VerificationToken;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Mail;
use Str;

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

        $token = Str::random(64);

        VerificationToken::create([
            'user_id' => $user->id,
            'token' => $token,
            'expired_at' => now()->addMinutes(30),
        ]);

        event(new Registered($user));

        return redirect()->route('verification.notice');
    }
}
