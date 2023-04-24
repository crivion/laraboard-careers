<?php

use App\Http\Controllers\Admin\ContractController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\JobsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DepartmentsController;
use App\Http\Controllers\Admin\JobApplicationController;
use App\Http\Controllers\Admin\LocationsController;
use App\Http\Controllers\Admin\UsersController;

Route::middleware(['auth', 'admin'])->prefix('dashboard')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::get('job-application/{jobApplication}', [JobApplicationController::class, 'view'])->name('job-application.view');
    Route::patch('job-application/{jobApplication}/update-status', [JobApplicationController::class, 'updateStatus'])->name('job-application.update-status');
    Route::get('job-application/download-cv/{jobApplication}', [JobApplicationController::class, 'downloadPDF'])->name('job-application.download-cv');

    Route::resource('jobs', JobsController::class, ['except' => ['show']]);
    Route::resource('departments', DepartmentsController::class, ['except' => ['create', 'edit']]);
    Route::resource('locations', LocationsController::class, ['except' => ['create', 'edit']]);
    Route::resource('contracts', ContractController::class, ['except' => ['create', 'edit']]);
    Route::resource('users', UsersController::class, ['except' => ['edit', 'create']]);
});
