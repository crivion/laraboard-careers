<?php

namespace App\Http\Controllers\Admin;

use App\Models\Job;
use Inertia\Inertia;
use App\Models\Location;
use App\Models\Department;
use App\Models\JobApplication;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {

        $departments = Department::all();
        $locations = Location::all();
        $myPostedJobs = Job::select('id','job_title')->postedByMe()->get();


        $applications = JobApplication::onMyJobs()
                                    ->with(['job' => function($query) {
                                        $query->with('department', 'location', 'user');
                                    }])
                                    ->applyFilters($request)
                                    ->orderByDesc('id')
                                    ->paginate(10)
                                    ->withQueryString();

        // pass query string to Inertia to set filtering form state
        $queryFilters = $request->only(['applicant', 'jobId', 'department_id', 'location_id', 'applicant_status']);

        return Inertia::render('Dashboard/Dashboard', compact('applications', 'locations', 'departments', 'myPostedJobs', 'queryFilters'));
    }
}
