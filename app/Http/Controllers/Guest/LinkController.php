<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Link;
use Illuminate\Http\Request;
use Str;

class LinkController extends Controller
{
    public function shorten(Request $request)
    {
        $validated = $request->validate([
            'url' => 'required|url|max:2048'
        ]);

        do {
            $unique_code = Str::random(6);
        } while (Link::where('unique_code', $unique_code)->exists());

        $link = Link::create([
            'target_url' => $validated['url'],
            'unique_code' => $unique_code,
            'expired_at' => now()->addDays(7),
        ]);

        return response()->json([
            'message' => 'URL Successfully shortened, URL shortened by a guest will be expired after 7 days.',
            'shortened_url' => url('/', $link->unique_code),
        ]);
    }
}
