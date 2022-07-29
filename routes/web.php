<?php

use App\Http\Controllers\Front\HomepageController;
use App\Http\Controllers\Front\JobDetailsController;
use App\Http\Controllers\Front\TeamController;
use Illuminate\Support\Facades\Route;
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

Route::get('/', HomepageController::class)->name('homepage');
Route::get('position/{slug}', JobDetailsController::class)->name('job-details');
Route::get('team', TeamController::class)->name('team');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
