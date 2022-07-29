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

        $job->load(['department', 'location', 'contractType', 'user']);
        
        return Inertia::render('JobDetails', [
            'job' => $job,
        ]);
    }
    
}
