<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminAuthController;

Route::get('admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');