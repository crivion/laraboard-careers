<?php

namespace App\Http\Controllers\Front;

use App\Models\Job;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
