<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    private function redirectLink(Link $link)
    {
        if ($link->expired_at && now()->greaterThan($link->expired_at)) {
            abort(410, 'This link has expired.');
        }

        return redirect()->away($link->target_url);
    }

    public function redirectWithPrefix($prefix, $code)
    {
        $link = Link::where('unique_code', $code)
            ->whereHas('prefix', fn($q) => $q->where('name', $prefix))
            ->firstOrFail();

        return $this->redirectLink($link);
    }

    public function redirectWithoutPrefix($code)
    {
        $link = Link::where('unique_code', $code)->whereNull('prefix_id')->firstOrFail();

        return $this->redirectLink($link);
    }
}
