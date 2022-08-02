<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\JobApplication;

class DashboardController extends Controller
{
    public function __invoke()
    {

        $applications = JobApplication::onMyJobs()
                                    ->with(['job' => function($query) {
                                        $query->with('department', 'location', 'user');
                                    }])
                                    ->orderByDesc('id')
                                    ->paginate(10);

        return Inertia::render('Dashboard/Dashboard', compact('applications'));
    }
}
