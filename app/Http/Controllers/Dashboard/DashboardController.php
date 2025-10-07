<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Click;
use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Str;

class DashboardController extends Controller
{
    public function overview()
    {
        $user = Auth::user();

        $totalClicks = Click::whereHas('link', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })->count();

        $totalLinks = Link::where('user_id', $user->id)->count();

        $recentLinks = Link::where('user_id', $user->id)
            ->withCount('clicks')
            ->latest()
            ->take(5)
            ->get();

        $clicksLast7Days = Click::whereHas('link', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })
            ->selectRaw('DATE(created_at) as day, COUNT(*) as clicks')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        $bestPerformingLink = Link::where('user_id', $user->id)
            ->withCount('clicks')
            ->orderByDesc('clicks_count')
            ->first();

        return Inertia::render('dashboard/overview', [
            'totalLinks' => $totalLinks,
            'totalClicks' => $totalClicks,
            'recentLinks' => $recentLinks,
            'clicksLast7Days' => $clicksLast7Days,
            'bestPerformingLink' => $bestPerformingLink,
        ]);
    }

    public function links()
    {
        $user = Auth::user();

        $links = Link::where('user_id', $user->id)
            ->withCount('clicks')
            ->latest()
            ->get();

        return Inertia::render('dashboard/links', [
            'links' => $links,
        ]);
    }

    public function linksCreate(Request $request)
    {
        $validated = $request->validate([
            'customShortCode' => ['nullable', 'string', 'min:3', 'max:10'],
            'originalUrl' => ['required', 'url', 'max:2048']
        ]);
        $user = Auth::user();

        do {
            $unique_code = $validated['customShortCode']
                ?? Str::random(6);
        } while (Link::where('unique_code', $unique_code)->exists());

        $link = Link::create([
            'user_id' => $user->id,
            'target_url' => $validated['originalUrl'],
            'unique_code' => $unique_code,
        ]);

        return back()->with([
            'message' => 'URL Successfully shortened.',
            'shortened_url' => url('/', $link->unique_code),
        ]);
    }

    public function linksEdit(Request $request)
    {
        $validated = $request->validate([
            'id' => ['required', 'integer', 'exists:links,id'],
            'customShortCode' => ['nullable', 'string', 'min:3', 'max:10'],
            'originalUrl' => ['required', 'url', 'max:2048']
        ]);
        $user = Auth::user();

        $link = Link::where('id', $validated['id'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        $link->target_url = $validated['originalUrl'];
        if (!empty($validated['customShortCode'])) {
            $link->unique_code = $validated['customShortCode'];
        }
        $link->save();

        return back()->with([
            'message' => 'URL Successfully edited.',
        ]);
    }

    public function prefixes()
    {
        return Inertia::render('dashboard/prefixes');
    }

    public function analytics()
    {
        return Inertia::render('dashboard/analytics');
    }
}
