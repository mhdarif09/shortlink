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

    // Jika current_target belum di-set atau 1, tampilkan link_1 dulu
    if (is_null($shortLink->current_target) || $shortLink->current_target == 1) {
        // Redirect ke link_1 tanpa langsung update database
        // Gunakan endpoint acknowledge untuk update current_target
        $ackUrl = route('shortlink.acknowledge', $shortLink->slug);
        return redirect()->away($ackUrl);
    } else {
        // Kalau sudah target 2, langsung ke link_2
        return redirect()->away($shortLink->link_2);
    }
}

// Endpoint baru untuk acknowledge link_1
public function acknowledge($slug)
{
    $shortLink = ShortLink::where('slug', $slug)->firstOrFail();

    // Update current_target baru setelah user diarahkan ke link_1
    $shortLink->current_target = 2;
    $shortLink->save();

    // Redirect ke link_1 sesungguhnya
    return redirect()->away($shortLink->link_1);
}
}