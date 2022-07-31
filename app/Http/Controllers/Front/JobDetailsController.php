<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobDetailsController extends Controller
{
    public function __invoke(Job $job, Request $request)
    {
        // append job details
        $job->load(['department', 'location', 'contractType', 'user']);

        // return the view
        return Inertia::render('JobDetails', compact('job'));
    }
}
