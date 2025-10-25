<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortLinkController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/go/{slug}', [ShortLinkController::class, 'redirect'])->name('shortlink.redirect');
Route::get('/s/{slug}/acknowledge', [ShortLinkController::class, 'acknowledge'])->name('shortlink.acknowledge');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'shortlinks' => Auth::user()->shortLinks()->latest()->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/shortlinks/create', [ShortLinkController::class, 'create'])->name('shortlinks.create');
    Route::post('/shortlinks', [ShortLinkController::class, 'store'])->name('shortlinks.store');
});

require __DIR__.'/auth.php';