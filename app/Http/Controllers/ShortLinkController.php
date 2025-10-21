<?php

namespace App\Http\Controllers;

use App\Models\ShortLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;
use Inertia\Inertia;

class ShortLinkController extends Controller
{
    public function create()
    {
        return Inertia::render('Shortlinks/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'slug' => 'required|string|alpha_dash|max:255|unique:short_links,slug',
            'link_1' => 'required|url',
            'link_2' => 'required|url',
        ]);

        Auth::user()->shortLinks()->create($validatedData);

        return to_route('dashboard')->with('success', 'Shortlink berhasil dibuat!');
    }

    public function redirect($slug)
    {
        $shortLink = ShortLink::where('slug', $slug)->firstOrFail();

        if ($shortLink->current_target == 1) {
            $destinationUrl = $shortLink->link_1;
            $shortLink->current_target = 2;
            $shortLink->save();
        } else {
            $destinationUrl = $shortLink->link_2;
        }

        return redirect()->away($destinationUrl);
    }
}