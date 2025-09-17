<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Click;
use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;

class DashboardController extends Controller
{
    public function overview()
    {
        $user = Auth::user();

        $clicks = Click::whereHas('link', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->get();

        $links = Link::where('user_id', $user->id)->get();

        return Inertia::render('dashboard/overview', [
            'totalClicks' => $clicks->count(),
            'totalLinks' => $links->count(),
            'recentLinks' => Link::where('user_id', $user->id)
                ->withCount('clicks')
                ->latest()
                ->take(5)
                ->get(),
            'clicksLast7Days' => Click::whereHas('link', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
                ->selectRaw('DATE(created_at) as day, COUNT(*) as clicks')
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('day')
                ->orderBy('day')
                ->get(),
        ]);
    }

    public function links()
    {
        return Inertia::render('dashboard/links');
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
