<?php

use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\Guest\LinkController;
use App\Http\Controllers\NewPasswordController;
use App\Http\Controllers\PasswordResetLinkController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home Route
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::redirect('/home', '/');
Route::redirect('/index', '/');

// Dashboard Route
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Email Verification Route
Route::get('/verify-notice', function () {
    return Inertia::render('auth/verify-notice');
})->name('verification.notice');

Route::get('/verify-email/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/login');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/resend', VerifyController::class)->name('email.resend');

// Forgot Password Route
Route::get('/forgot-password', [PasswordResetLinkController::class, 'index'])->name('password.request');
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

// Password Reset Route
Route::get('/reset-password/{token}', [NewPasswordController::class, 'index'])->name('password.reset');
Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.store');

// About Route
Route::get('/about', function () {
    return 'about sementara';
})->name('about');

// Guest Route
Route::middleware(['guest'])->group(function () {
    Route::post('/guest/shorten', [LinkController::class, 'shorten'])->middleware('guest:sanctum');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/short_url.php';
