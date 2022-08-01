<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\JobsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('dashboard')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::resource('jobs', JobsController::class);
    Route::get('team', fn() => 'jobs admin')->name('admin.team');
    Route::get('users', fn() => 'jobs admin')->name('admin.users');
});