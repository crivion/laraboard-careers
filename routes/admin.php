<?php

use App\Http\Controllers\Admin\ContractController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\JobsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DepartmentsController;
use App\Http\Controllers\Admin\JobApplicationController;
use App\Http\Controllers\Admin\LocationsController;

Route::middleware(['auth', 'admin'])->prefix('dashboard')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::resource('jobs', JobsController::class);
    Route::get('job-application/{jobApplication}', [JobApplicationController::class, 'view'])->name('job-application.view');
    Route::patch('job-application/{jobApplication}/update-status', [JobApplicationController::class, 'updateStatus'])->name('job-application.update-status');
    Route::get('job-application/download-cv/{jobApplication}', [JobApplicationController::class, 'downloadPDF'])->name('job-application.download-cv');
    Route::resource('departments', DepartmentsController::class);
    Route::resource('locations', LocationsController::class);
    Route::resource('contracts', ContractController::class);
    Route::get('users', fn () => 'jobs admin')->name('admin.users');
});

