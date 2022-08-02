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
                                    ->with('job:id,job_title,slug')
                                    ->paginate(10);

        return Inertia::render('Dashboard/Dashboard', compact('applications'));
    }
}
