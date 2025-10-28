<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Click;
use App\Models\Link;
use App\Models\Prefix;
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
            ->with('prefix')
            ->latest()
            ->get()
            ->map(function ($link) {
                $prefix = $link->prefix ? $link->prefix->name . '/' : '';
                $link->short_url = url($prefix . $link->unique_code);
                return $link;
            });
            
        $prefixes = Prefix::where('user_id', $user->id)
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/links', [
            'links' => $links,
            'prefixes' => $prefixes,
        ]);
    }

    public function linksCreate(Request $request)
    {
        $validated = $request->validate([
            'customShortCode' => ['nullable', 'string', 'min:3', 'max:10'],
            'originalUrl' => ['required', 'url', 'max:2048'],
            'prefixId' => ['nullable', 'exists:prefixes,id']
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
            'prefix_id' => !empty($validated['prefixId']) ? $validated['prefixId'] : null,
        ]);

        $prefix = null;
        if (!empty($validated['prefixId'])) {
            $prefix = Prefix::find($validated['prefixId'])->name;
            return back()->with([
                'message' => 'URL Successfully shortened.',
                'shortened_url' => url($prefix . '/' . $link->unique_code),
            ]);
        }

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
            'originalUrl' => ['required', 'url', 'max:2048'],
            'prefixId' => ['nullable', 'exists:prefixes,id']
        ]);
        $user = Auth::user();

        $link = Link::where('id', $validated['id'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        $link->target_url = $validated['originalUrl'];
        if (!empty($validated['customShortCode'])) {
            $link->unique_code = $validated['customShortCode'];
        }
        $link->prefix_id = !empty($validated['prefixId']) ? $validated['prefixId'] : null;
        $link->save();

        return back()->with([
            'message' => 'URL Successfully edited.',
        ]);
    }

    public function prefixes()
    {
        $user = Auth::user();
        $prefixes = Prefix::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('dashboard/prefixes', [
            'prefixes' => $prefixes
        ]);
    }

    public function prefixesStore(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        if (Prefix::where('user_id', Auth::id())
            ->where('name', $validated['name'])
            ->exists()) {
            return back()->withErrors(['name' => 'You already have a prefix with that name.']);
        }

        Prefix::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
        ]);

        return back()->with('message', 'Prefix created successfully.');
    }

    public function prefixesDestroy(Prefix $prefix)
    {
        // Ensure the authenticated user owns the prefix
        if ($prefix->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $prefix->delete();

        return back()->with('message', 'Prefix deleted successfully.');
    }

    public function prefixesUpdate(Request $request, Prefix $prefix)
    {
        // Ensure the authenticated user owns the prefix
        if ($prefix->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Check for unique prefix name for the current user, excluding the current prefix
        if (Prefix::where('user_id', Auth::id())
            ->where('name', $validated['name'])
            ->where('id', '!=', $prefix->id)
            ->exists()) {
            return back()->withErrors(['name' => 'You already have a prefix with that name.']);
        }

        $prefix->update($validated);

        return back()->with('message', 'Prefix updated successfully.');
    }

    public function analytics()
    {
        $user = Auth::user();

        $totalClicks = Click::whereHas('link', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })->count();

        $clicksOverTime = Click::whereHas('link', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })
            ->selectRaw('DATE(created_at) as date, COUNT(*) as clicks')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $topLinks = Link::where('user_id', $user->id)
            ->with('prefix')
            ->withCount('clicks')
            ->orderByDesc('clicks_count')
            ->take(3)
            ->get()
            ->map(function ($link) {
                $prefix = $link->prefix ? $link->prefix->name . '/' : '';
                $link->short_url = url($prefix . $link->unique_code);
                return $link;
            });

        return Inertia::render('dashboard/analytics', [
            'totalClicks' => $totalClicks,
            'clicksOverTime' => $clicksOverTime,
            'topLinks' => $topLinks,
        ]);
    }
}
