<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Str;

class LinkController extends Controller
{
    public function shorten(Request $request)
    {
        $validated = $request->validate([
            'url' => 'required|url|max:2048'
        ]);

        $unique_code = Str::random(6);
    }
}
