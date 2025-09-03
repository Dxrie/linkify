<?php

use App\Http\Controllers\LinkController;
use Illuminate\Support\Facades\Route;

Route::get('/{prefix}/{code}', [LinkController::class, 'redirectWithPrefix'])->name('shortener.redirectWithPrefix');
Route::get('/{code}', [LinkController::class, 'redirectWithoutPrefix'])->name('shortener.redirectWithoutPrefix');
