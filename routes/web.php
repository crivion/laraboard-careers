<?php

use App\Http\Controllers\Front\HomepageController;
use App\Http\Controllers\Front\JobDetailsController;
use App\Http\Controllers\Front\StoreJobApplicationController;
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

Route::any('/', HomepageController::class)->name('homepage');
Route::get('position/{job}', JobDetailsController::class)->name('jobDetails');
Route::post('position/{job}/store-application', [StoreJobApplicationController::class, 'store'])->name('storeJobApplication');
Route::get('application/{job}', [StoreJobApplicationController::class, 'applicationReceived'])->name('jobApplicationReceived');
Route::get('team', TeamController::class)->name('team');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
