<?php

namespace App\Http\Controllers;

use App\Models\Click;
use App\Models\Link;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;

class LinkController extends Controller
{
    public function redirectWithPrefix(Request $request, $prefix, $code)
    {
        $link = Link::where('unique_code', $code)
            ->whereHas('prefix', fn($q) => $q->where('name', $prefix))
            ->firstOrFail();

        $agent = new Agent();
        $userAgent = $request->userAgent();

        $agent->setUserAgent($userAgent);

        $browserName = $agent->browser() ?? 'Unknown';
        $operatingSystem = $agent->platform() ?? 'Unknown';

        Click::create([
            'link_id' => $link->id,
            'os' => $operatingSystem,
            'browser' => $browserName,
        ]);

        return view('confirm', [
            'url' => $link->target_url,
        ]);
    }

    public function redirectWithoutPrefix(Request $request, $code)
    {
        $link = Link::where('unique_code', $code)->whereNull('prefix_id')->firstOrFail();

        $agent = new Agent();
        $userAgent = $request->userAgent();

        $agent->setUserAgent($userAgent);

        $browserName = $agent->browser() ?? 'Unknown';
        $operatingSystem = $agent->platform() ?? 'Unknown';

        Click::create([
            'link_id' => $link->id,
            'os' => $operatingSystem,
            'browser' => $browserName,
        ]);

        return view('confirm', [
            'url' => $link->target_url,
        ]);
    }
}
