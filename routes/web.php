<?php

use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\Guest\LinkController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/verify-notice', function () {
    return Inertia::render('auth/verify-notice');
})->name('verification.notice');

Route::get('/verify-email/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/login');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/resend', VerifyController::class);

Route::get('/about', function () {
    return 'about sementara';
})->name('about');

Route::middleware(['guest'])->group(function () {
    Route::post('/guest/shorten', [LinkController::class, 'shorten'])->middleware('guest:sanctum');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
